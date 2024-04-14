const { Router } = require("express")
const { check, header } = require('express-validator');
const { registerUser, loginUser, verifyJWT } = require("../controllers/auth.controller");
const { expressValidations } = require("../middlewares/common.validations");

const authRouter = Router()

authRouter.post("/registro",
    [
        //Validar cuerpo para que no llegue vacio por ej
        check('username', "Debe mandar nombre de usuario").notEmpty(),
        check('username', "Debe ser alphanumerico").isAlphanumeric(),
        check('password', "Debe mandar una contraseña").notEmpty(),
        check('password', "Debe ser alphanumerica").isAlphanumeric(),
        check('email', "Debe mandar un mail").notEmpty(),
        check('email', "Debe tener formato de mail").isEmail(),
    ],
    expressValidations,
    registerUser
)

authRouter.post(
    "/login",
    [
        check('username', "Debe mandar nombre de usuario").notEmpty(),
        check('username', "Debe ser alphanumerico").isAlphanumeric(),
        check('password', "Debe mandar una contraseña").notEmpty(),
        check('password', "Debe ser alphanumerica").isAlphanumeric(),
    ],
    expressValidations,
    loginUser
)

module.exports = authRouter;