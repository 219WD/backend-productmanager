const { Router } = require("express");
const { check } = require('express-validator');
const { registerUser, loginUser, requestResetPassword, resetPassword } = require("../controllers/auth.controller");
const { expressValidations } = require("../middlewares/common.validations");

const authRouter = Router();

authRouter.post(
    "/registro",
    [
        check('username', "Debe mandar nombre de usuario").notEmpty(),
        check('username', "Debe ser alphanumerico").isAlphanumeric(),
        check('password', "Debe mandar una contraseña").notEmpty(),
        check('password', "Debe ser alphanumerica").isAlphanumeric(),
        check('email', "Debe mandar un mail").notEmpty(),
        check('email', "Debe tener formato de mail").isEmail(),
    ],
    expressValidations,
    registerUser
);

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
);

authRouter.post(
    "/reset-password-request",
    [
        check('email', "Debe mandar un mail").notEmpty(),
        check('email', "Debe tener formato de mail").isEmail(),
    ],
    expressValidations,
    requestResetPassword
);

authRouter.post(
    "/reset-password/:token", 
    [
        check('newPassword', "Debe mandar una nueva contraseña").notEmpty(),
    ],
    expressValidations,
    resetPassword
);

module.exports = authRouter;
