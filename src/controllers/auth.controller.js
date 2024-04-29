const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const { JWT_SECRET } = require("../common/constants")
require("dotenv").config()

const registerUser = async (req, res) => {
  //Validando si encontramos algun error

  const {
    username,
    password,
    email
  } = req.body

  //Logica de encriptacion
  const salt = bcrypt.genSaltSync(5)
  const hashedPassword = bcrypt.hashSync(password, salt)

  //logica de creacion de usuario
  const user = new User({
    username,
    password: hashedPassword,
    email
  })

  await user.save()

  res.status(201)
  res.json({ message: "Usuario creado", ussername: user.username })
}

const loginUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  //Existe el usuario?
  const user = await User.findOne({ username })

  if (user === null) {
    res.status(404)
    return res.json({ message: "Usuario no encontrado" })
  }

  //Verifica si la contraseña es igual a la que sea creo en el registro
  const isMatch = bcrypt.compareSync(password, user.password);

  //Error 401 sin autorizacion
  if (!isMatch) {
    res.status(401)
    return res.json({ message: "Sin autorizacion" })
  }

  //Firmo el JWT
  const token = jwt.sign({
    id: user._id,
    username: user.username,
    esEmpleado: user.esEmpleado
  }, JWT_SECRET);

  res.status(200);
  res.json({ access_token: token });
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId } = decoded;

    // Buscar el usuario con el userId del token
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar la contraseña del usuario
    const hashedPassword = bcrypt.hashSync(newPassword, 5);
    userToUpdate.password = hashedPassword;
    await userToUpdate.save();

    // Enviar respuesta exitosa al front-end
    res.status(200).json({ message: 'Contraseña cambiada exitosamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error al restablecer contraseña.' });
    next(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    res.status(500).json({ error: 'Error al solicitar restablecimiento de contraseña.' });
  }
};

const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento de contraseña
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Enviar correo electrónico con el enlace del token
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "macgunmanmc@gmail.com",
        pass: "aoeuzcparrmmkkut"
      }
    });

    const resetPasswordLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: 'stock.manager.soporte@gmail.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: `<img src="https://i.imgur.com/QEs2Rku.png" alt="banner" />
             <p>Hola ${user.username}, somos de soporte tecnico de Stock Manager</p>
             <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
             <a href="${resetPasswordLink}">Restablecer Contraseña</a>`
    });

    // Respuesta exitosa al front-end
    res.status(200).json({ message: 'Correo electrónico enviado con instrucciones para restablecer la contraseña.' });

  } catch (error) {
    res.status(500).json({ error: 'Error al solicitar restablecimiento de contraseña.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  requestResetPassword,
  resetPassword
};