const { Router } = require("express")
const Vencimiento = require("../models/vencimiento.model")
const { createVencimiento, findAllVencimiento, updateVencimientoById } = require("../controllers/vencimiento.controller")
const { body, param } = require('express-validator');
const { expressValidations } = require('../middlewares/common.validations');
const { verify } = require("jsonwebtoken");
const { verifyJWT } = require("../middlewares/auth.validations")

const vencimientoRouter = Router()

//Create
vencimientoRouter.post("/create", [
    body("cantidadProductos", "Debe mandar una cantidad de productos").notEmpty(),
    body("cantidadDias", "Debe mandar una cantidad de dias").notEmpty()
],
    verifyJWT,
    expressValidations,
    createVencimiento
);

// READ LAST
vencimientoRouter.get("/findLast", async (req, res) => {
    try {
        const lastVencimiento = await Vencimiento.findOne().sort({ _id: -1 }).limit(1);
        res.json(lastVencimiento);
    } catch (error) {
        console.error("Error finding last vencimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//Update
vencimientoRouter.put("/updateById/:id", [
    param("id", "Debe mandar un Id valido").isMongoId(),
    body("cantidadProductos", "Debe mandar una cantidad de productos").optional(),
    body("cantidadDias", "Debe mandar una cantidad de dias").optional(),
],
    expressValidations,
    updateVencimientoById
);

module.exports = vencimientoRouter;