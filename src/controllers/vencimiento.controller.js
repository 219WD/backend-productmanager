const { body } = require("express-validator")
const Vencimient = require("../models/vencimiento.model")
const Vencimiento = require("../models/vencimiento.model")

const createVencimiento = async (req, res) => {
    const vencimient = new Vencimiento({ cantidadProductos: req.body.cantidadProductos, cantidadDias: req.body.cantidadDias })
    await vencimient.save()

    res.status(201).json({ message: `Vencimiento establecido ${req.body.cantidadDias}` })
}

const findAllVencimiento = async (req, res) => {
    try {
        const vencimientos = await Vencimiento.find();

        res.json({ message: "Todos los vencimientos", data: vencimientos });
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al buscar los vencimientos" });
    }
}

const updateVencimientoById = async (req, res) => {
    const vencimient = await Vencimiento.findById(req.params.id);

    if (vencimient === null) {
        res.status(404)
        return res.json({ message: "Vencimiento no encontrado" })
    } 

    await Vencimiento.findByIdAndUpdate(req.params.id, {
        cantidadProductos: req.body.cantidadProductos,
        cantidadDias: req.body.cantidadDias
    })


    res.json({ message: "Vencimiento actualizado" })
}

module.exports = {
    createVencimiento,
    findAllVencimiento,
    updateVencimientoById
}