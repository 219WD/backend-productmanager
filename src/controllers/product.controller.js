const { validationResult } = require('express-validator');
const Product = require("../models/products.model");
const Category = require("../models/categoria.model");

const createProduct = async (req, res) => {
    const { marca, producto, precio, descripcion, peso, cantidad, vencimiento, categoria } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const category = await Category.findById(categoria);

        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        const newProduct = new Product({
            marca,
            producto,
            precio,
            descripcion,
            peso,
            cantidad,
            vencimiento,
            categoria: category
        });

        const savedProduct = await newProduct.save();

        // Obtener el nombre de la categoría
        const categoryName = category.nombre;

        // Enviar la respuesta con el nombre de la categoría
        res.json({ ...savedProduct.toObject(), categoria: categoryName });
    } catch (error) {
        res.status(500).send('Error al crear el producto');
    }
};


const findAllProducts = async (req, res) => {
    const productRegex = new RegExp(req.query.producto, 'i');
    const marcaRegex = new RegExp(req.query.marca, 'i');
    const productos = await Product.find({ producto: { $regex: productRegex }, marca: { $regex: marcaRegex } })

    res.json({ message: "Buscar todos los productos", data: productos })
}

const findProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product === null) {
        res.status(404);
        return res.json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Buscar producto por Id", data: product });
}

const updateProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product === null) {
        res.status(404)
        return res.json({ message: "Producto no encontrado" })
    }

    await Product.findByIdAndUpdate(req.params.id, {
        marca: req.body.marca, 
        producto: req.body.producto, 
        precio: req.body.precio, 
        descripcion: req.body.descripcion, 
        peso: req.body.peso, 
        cantidad: req.body.cantidad, 
        vencimiento: req.body.vencimiento, 
        categoria: req.body.categoria
    })


    res.json({ message: "Producto actualizado" })
}

const deleteProductById = async (req, res) => {
    const filters = { _id: req.params.id }
    const deletedDocuments = await Product.deleteOne(filters)

    if (deletedDocuments.deletedCount === 0) {
        res.status(404)
        return res.json({ message: "Producto no encontrado" })
    }

    res.json({ message: "Producto eliminado" })
}

module.exports = {
    createProduct,
    findAllProducts,
    findProductById,
    updateProductById,
    deleteProductById
}