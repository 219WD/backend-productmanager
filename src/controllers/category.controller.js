const { body } = require("express-validator")
const Category = require("../models/categoria.model")
const Categoria = require("../models/categoria.model")

const createCategory = async (req, res) => {
    const category = new Categoria({ nombre: req.body.nombre, descripcion: req.body.descripcion })
    await category.save()

    res.status(201).json({ message: `Categoria creada ${req.body.nombre}` })
}

const findAllCategories = async (req, res) => {
    const nameRegex = new RegExp(req.query.nombre, 'i');
    const descriptionRegex = new RegExp(req.query.descripcion, 'i');
    const categorias = await Categoria.find({ nombre: { $regex: nameRegex }, descripcion: { $regex: descriptionRegex } })

    res.json({ message: "Buscar todas las Categorias", data: categorias })
}

const findCategoryById = async (req, res) => {
    const category = await Categoria.findById(req.params.id);

    if (category === null) {
        res.status(404);
        return res.json({ message: "Categoria no encontrada" });
    }

    res.json({ message: "Buscar categoria por Id", data: category });
}

const updateCategoryById = async (req, res) => {
    const category = await Categoria.findById(req.params.id);

    if (category === null) {
        res.status(404)
        return res.json({ message: "Categoria no encontrada" })
    } 

    await Categoria.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    })


    res.json({ message: "Categoria actualizada" })
}

const deleteCategoryById = async (req, res) => {
    const filters = { _id: req.params.id }
    const deletedDocuments = await Categoria.deleteOne(filters)

    if (deletedDocuments.deletedCount === 0) {
        res.status(404)
        return res.json({ message: "Categoria no encontrada" })
    }

    res.json({ message: "Categoria eliminada" })
}

module.exports = {
    createCategory,
    findAllCategories,
    findCategoryById,
    updateCategoryById,
    deleteCategoryById
}