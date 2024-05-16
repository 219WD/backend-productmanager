const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRouter = require('./src/routes/product.route')
const categoriaRouter = require('./src/routes/categoria.route');
const authRouter = require('./src/routes/auth.route');
const { buscar } = require('./src/controllers/buscar.controller');
const adminRouter = require('./src/routes/admin.route');
const Mercado_Pago = require("./src/routes/Mercado_Pago_Router");
const selectedFields = require("./src/routes/fields.Router");
const vencimiento = require("./src/routes/vencimiento.route") 

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


const port = process.env.PORT || 8000;


app.use('/products', productRouter);
app.use('/categorias', categoriaRouter);
app.use('/auth', authRouter);
app.use('/buscar', buscar);
app.use('/admin', adminRouter);
app.use("/Mercado_Pago", Mercado_Pago);
app.use('/selectedFields', selectedFields)
app.use('/vencimiento', vencimiento)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a la base de datos');
        app.listen(port, () => {
            console.log(`Aplicación ejecutándose en el puerto ${port}`);
        });
    })
    .catch(error => console.error('Error al conectar con la base de datos:', error));
