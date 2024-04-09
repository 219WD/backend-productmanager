const { Router } = require("express")
const Categoria = require("../models/categoria.model")

const categoriaRouter = Router()

categoriaRouter.get('/findAll', async (req, res) => {
    const categorias = await Categoria.find()

    res.status(200)
    res.json(categorias)
})

// productRouter.get('/by-id/:id/filter', y buscamos precio
categoriaRouter.get('/by-id/:id', async (req, res) =>{
    const categoria = await Categoria.findById(req.params.id)

    if(categoria == null) {
        res.status(400)
        return res.json({ message: "Categoria no encontrada "})
    }

    res.status(200)
    res.json(product)
})

categoriaRouter.post("/create", async (req, res) => {
    const {
        nombre,
        descripcion
    } = req.body

    const categoria = new Categoria({
        nombre: nombre,
        descripcion: descripcion,
    }
    )

    await categoria.save()

    res.json(categoria)
})

module.exports = categoriaRouter;