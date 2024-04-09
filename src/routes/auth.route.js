const { Router } = require("express")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const { body, validationResult, check } = require('express-validator');

const authRouter = Router()

const usernameValidation = async (req, res, next) => {
    const {
        username,
    } = req.body

    //Busca en la base de datos el nombre de ususario
    const usernameExist = await User.find({ username })
    if (!!usernameExist.length) {
        //Si lo encuentro le indico que ya esta ocupado
        res.status(400)
        res.json({ message: "Usuario ya registrado" })
    }
    //Pasamos a la siguiente
    next()
}

const mailValidation = async (req, res, next) => {
    const {
        email,
    } = req.body

    const emailExist = await User.find({ email })
    if (!!emailExist.length) {
        res.status(400)
        res.json({ message: "Email ya registrado" })
    }
    next()
}

const passwordValidation = async (req, res, next) => {
    const {
        password,
    } = req.body
    const passwordRegex = /^[A-Za-z0-9*_]+$/i;

    if (passwordRegex.test(password)) {
        next()
    } else {
        res.status(400)
        res.json({ message: "La contraseña debe ser alphanumerica y usar '_' o '*'" })
    }
}

authRouter.post("/registro",
    //Validar cuerpo para que no llegue vacio por ej
    check('username', "Debe mandar nombre de usuario").notEmpty(),
    check('username', "Debe ser alphanumerico").isAlphanumeric(),
    check('email', "Debe ser un formato tipo email ejemplo: test@test.com").isEmail(),
    usernameValidation,
    mailValidation,

    async (req, res) => {
        //Validando si encontramos algun error
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400)
            res.send({ errors: result.array() });
        }

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

        delete user._id

        res.status(201)
        res.json(user)
    })

authRouter.post("/login",
    passwordValidation,
    async (req, res) => {

    })
authRouter.put("/promotion", [
    check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
    check("username", "Usuario debe ser alphanumerico").isAlphanumeric(),
    check("username", "Debe mandar un nombre de usuario").notEmpty()
]
    ,
    async (req, res) => {
        //Validando si encontramos algun error
        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.status(400)
            res.send({ errors: result.array() });
        }
        if (req.body.isAdmin === false) {
            res.status(400)
            return res.json({ message: "Deberia ser Administrador" })
        }

        const username = req.body.username

        const filter = { username };
        const update = { esEmpleado: true };

        await User.findOneAndUpdate(filter, update)

        res.json({ message: "Actualizacion exitosa" })
    })

authRouter.delete("/delete", [
    check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
    check("id", "Debe mandar un Id valido").isMongoId(),
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400)
        res.send({ errors: result.array() });
    }
    if (req.body.isAdmin === false) {
        res.status(400)
        return res.json({ message: "Deberia ser Administrador" })
    }

    await User.deleteOne({ _id: req.body.id });
    res.json({ message: "Borrado exitosamente" })
})

module.exports = authRouter;