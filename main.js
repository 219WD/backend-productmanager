const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importa las rutas de tu aplicación
const productRouter = require('./src/routes/product.route');
const categoriaRouter = require('./src/routes/categoria.route');
const authRouter = require('./src/routes/auth.route');
const { buscar } = require('./src/controllers/buscar.controller');
const adminRouter = require('./src/routes/admin.route');
// const Mercado_Pago = require("./src/routes/Mercado_Pago_Router");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//Defino un puerto en donde se ejecutara mi aplicacion
const port = 8000;

// Agrega las rutas de tu aplicación
app.use('/products', productRouter);
app.use('/categorias', categoriaRouter);
app.use('/auth', authRouter);
app.use('/buscar', buscar);
app.use('/admin', adminRouter);
// app.use("/Mercado_Pago", Mercado_Pago);


// Conexión a la base de datos y inicio del servidor
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a la base de datos');
        app.listen(port, () => {
            console.log(`Aplicación ejecutándose en el puerto ${port}`);
        });
    })
    .catch(error => console.error('Error al conectar con la base de datos:', error));
