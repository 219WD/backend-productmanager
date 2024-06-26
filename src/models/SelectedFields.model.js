const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");

const selectedFields = mongoose.Schema(
    {
        marca: {
            type: Boolean
        },
        producto: {
            type: Boolean
        },
        precio: {
            type: Boolean
        },
        descripcion: {
            type: Boolean
        },
        peso: {
            type: Boolean
        },
        cantidad: {
            type: Boolean
        },
        vencimiento: {
            type: Boolean
        },
        categoria: {
            type: Boolean
        }
    }    
);

const Field = mongoose.model('Field', selectedFields)

module.exports = Field