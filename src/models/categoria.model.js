const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");

const categoriaSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        descripcion: {
            type: String,
            required: false,
            trim: true
        }
    }
)

const Categoria = mongoose.model('Categoria', categoriaSchema)

module.exports = Categoria