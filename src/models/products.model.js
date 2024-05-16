const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");

const productSchema = mongoose.Schema(
    {
        marca: {
            type: String,
            trim: true
        },
        producto: {
            type: String,
            trim: true
        },
        precio: {
            type: String,
            trim: true
        },
        descripcion: {
            type: String,
            trim: true
        },
        peso: {
            type: String,
            trim: true
        },
        cantidad: {
            type: String,
            trim: true
        },
        vencimiento: {
            type: Date,
            required: true,
            trim: true
        },
        categoria: {
            type: Schema.Types.ObjectId,
            ref: "Categoria",
            required: true,
            trim: true
        },
        selectedFields: {
            type: Schema.Types.Boolean,
            ref: "Field",
            trim: true
        }
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product