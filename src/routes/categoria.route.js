const { Router } = require("express")
const Categoria = require("../models/categoria.model")
const { createCategory, findAllCategories, findCategoryById, updateCategoryById, deleteCategoryById } = require("../controllers/category.controller")
const { body, param } = require('express-validator');
const { expressValidations } = require('../middlewares/common.validations');
const { verify } = require("jsonwebtoken");
const { verifyJWT } = require("../middlewares/auth.validations")

const categoriaRouter = Router()

//Create
categoriaRouter.post("/create", [
    body("nombre", "Debe mandar un nombre").notEmpty(),
    body("descripcion", "Debe mandar una descripcion").notEmpty()
],
    verifyJWT,
    expressValidations,
    createCategory
);

//ReadAll
categoriaRouter.get("/findAll", findAllCategories)

//ReadByID
categoriaRouter.get("/findById/:id", [
    param("id", "Debe mandar un Id valido").isMongoId()
],
    expressValidations,
    findCategoryById
);

//Update
categoriaRouter.put("/updateById/:id", [
    param("id", "Debe mandar un Id valido").isMongoId(),
    body("nombre", "Debe mandar un nombre").isString().optional(),
    body("descripcion", "Debe mandar una descripcion").isString().optional(),
],
    expressValidations,
    updateCategoryById
);

//Delete
categoriaRouter.delete("/deleteById/:id", [
    param("id", "Debe mandar un Id valido").isMongoId()
],
    expressValidations,
    deleteCategoryById
);

module.exports = categoriaRouter;