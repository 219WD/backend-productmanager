//Importo express a mi proyecto
const express = require('express')
const mongoose = require("mongoose")
const productRouter = require('./src/routes/product.route')
const categoriaRouter = require('./src/routes/categoria.route')
const authRouter = require('./src/routes/auth.route')
const cors = require("cors")

require("dotenv").config()

//Creo mi aplicacion con la funcion express
const app = express()
app.use(cors())

//Defino un puerto en donde se ejecutara mi aplicacion
const port = 8000

app.use(express.json({ limit: "50mb" }))

app.use("/products", productRouter)
app.use("/categorias", categoriaRouter)
app.use("/auth", authRouter)

//Nuestra app backend esta en marcha
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conectado a la DB")
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en el puerto ${port}`)
        })
    })
    .catch(error => console.error("Error al conectar con la DB:", error));