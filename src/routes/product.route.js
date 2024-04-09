const { Router } = require("express")
const Product = require("../models/products.model")

const productRouter = Router()

productRouter.get('/findAll', async (req, res) => {
    const products = await Product.find()

    res.status(200)
    res.json(products)
})

// productRouter.get('/by-id/:id/filter', y buscamos precio
productRouter.get('/by-id/:id', async (req, res) =>{
    const product = await Product.findById(req.params.id)

    if(product == null) {
        res.status(400)
        return res.json({ message: "Producto no encontrado "})
    }

    res.status(200)
    res.json(product)
})

productRouter.post("/create", async (req, res) => {
    const {
        nombre,
        precio,
        descripcion,
        peso,
        sabor
    } = req.body

    const product = new Product({
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        peso: peso,
        sabor: sabor,
    }
    )

    await product.save()

    res.json(product)
})

module.exports = productRouter;