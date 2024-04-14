const { Router } = require("express")
const Product = require("../models/products.model")
const { createProduct, findAllProducts, findProductById, updateProductById, deleteProductById } = require("../controllers/product.controller")
const { body, param } = require('express-validator');
const { expressValidations } = require('../middlewares/common.validations');
const { verify } = require("jsonwebtoken");
const { verifyJWT } = require("../middlewares/auth.validations")

const productRouter = Router()

//Create
productRouter.post("/createProduct", [
    body("marca", "Debe mandar una marca").notEmpty(),
    body("producto", "Debe mandar un producto").notEmpty(),
    body("precio", "Debe mandar un precio").notEmpty(),
    body("descripcion", "Debe mandar una descripcion").notEmpty(),
    body("peso", "Debe mandar un peso").notEmpty(),
    body("cantidad", "Debe mandar una cantidad").notEmpty(),
    body("vencimiento", "Debe mandar un vencimiento").notEmpty(),
    body("categoria", "Debe mandar una categoria").notEmpty()
],
    verifyJWT,
    expressValidations,
    createProduct
);

//ReadAll
productRouter.get("/findAllProduct", findAllProducts)

//ReadByID
productRouter.get("/findProductById/:id", [
    param("id", "Debe mandar un Id valido").isMongoId()
],
    expressValidations,
    findProductById
);

productRouter.put("/updateProductById/:id", [
    param("id", "Debe mandar un Id válido").isMongoId(),
    body("marca", "Debe mandar una marca").isString().optional(),
    body("producto", "Debe mandar un producto").isString().optional(),
    body("precio", "Debe mandar un precio").isNumeric().optional(),
    body("descripcion", "Debe mandar una descripción").isString().optional(),
    body("peso", "Debe mandar un peso").isString().optional(),
    body("cantidad", "Debe mandar una cantidad").isString().optional(),
    body("vencimiento", "Debe mandar un vencimiento válido").toDate().custom((value, { req }) => {
        if (isNaN(value.getTime())) {
            throw new Error('La fecha de vencimiento no es válida');
        }
        return true;
    }).optional(),
    body("categoria", "Debe mandar una categoría").isString().optional()
],
    expressValidations,
    updateProductById
);

//Delete
productRouter.delete("/deleteProductById/:id", [
    param("id", "Debe mandar un Id valido").isMongoId()
],
    expressValidations,
    deleteProductById
);

module.exports = productRouter;