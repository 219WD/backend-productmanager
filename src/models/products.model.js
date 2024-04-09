const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        precio: {
            type: Number,
            required: true
        },
        descripcion: {
            type: String,
            required: false,
            trim: true
        },
        peso: {
            type: String,
            required: true,
            trim: true
        },
        sabor: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product