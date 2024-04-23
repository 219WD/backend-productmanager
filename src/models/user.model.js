const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true, //Elimina los espacios de adelante y atras
            unique: true,
            minLength: 8,
            maxLength: 20
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8,
            maxLength: 128
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minLength: 8,
            maxLength: 64
        },
        esEmpleado: {
            type: Boolean,
            require: true,
            default: false
        }
    }
)

const Usuario = mongoose.model('Usuario', userSchema)

module.exports = Usuario