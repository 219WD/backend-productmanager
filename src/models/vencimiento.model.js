const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");

const vencimientoSchema = mongoose.Schema(
    {
        cantidadProductos: {
            type: Number,
            required: true,
            trim: true
        },
        cantidadDias: {
            type: Number,
            required: true,
            trim: true
        }
    }
)

const Vencimiento = mongoose.model('Vencimiento', vencimientoSchema)

module.exports = Vencimiento