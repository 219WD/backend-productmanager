//Importo express a mi proyecto
const express = require('express')
const mongoose = require("mongoose")
const productRouter = require('./src/routes/auth.route')
const categoriaRouter = require('./src/routes/categoria.route')
const authRouter = require('./src/routes/auth.route')

//Creo mi aplicacion con la funcion express
const app = express()

//Defino un puerto en donde se ejecutara mi aplicacion
const port = 8000

app.use(express.json({ limit: "50mb" }))

app.use("/products", productRouter)
app.use("/categorias", categoriaRouter)
app.use("/auth", authRouter)

//Nuestra app backend esta en marcha
mongoose.connect("mongodb+srv://macgunmanmc:EAvvsvNtBO2jKSgL@productmanager.quuq3cy.mongodb.net/?retryWrites=true&w=majority&appName=productmanager")
    .then(() => {
        console.log("Conectado a la DB")
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en el puerto ${port}`)
        })
    })
    .catch(error => console.error("Error al conectar con la DB:", error));