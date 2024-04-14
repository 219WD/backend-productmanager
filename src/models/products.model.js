const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        marca: {
            type: String,
            required: true,
            trim: true
        },
        producto: {
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
        cantidad: {
            type: String,
            required: true,
            trim: true
        },
        vencimiento: {
            type: Date,
            required: true,
            trim: true
        },
        categoria: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product