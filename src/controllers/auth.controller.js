const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../common/constants")

const registerUser = async (req, res) => {
    //Validando si encontramos algun error

    const {
        username,
        password,
        email,
        nombre,
        apellido
    } = req.body

    //Logica de encriptacion
    const salt = bcrypt.genSaltSync(5)
    const hashedPassword = bcrypt.hashSync(password, salt)

    //logica de creacion de usuario
    const user = new User({
        username,
        password: hashedPassword,
        email,
        nombre,
        apellido
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



module.exports = {
    registerUser,
    loginUser
}