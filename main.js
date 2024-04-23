const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago'); // Importa Preference desde la librería de MercadoPago

// Importa las rutas de tu aplicación
const productRouter = require('./src/routes/product.route');
const categoriaRouter = require('./src/routes/categoria.route');
const authRouter = require('./src/routes/auth.route');
const { buscar } = require('./src/controllers/buscar.controller');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Configura MercadoPago
const mercadopagoAccessToken = 'TEST-6439372485706422-061517-80fa3671d86f8f6c4475603079a362a4-149809118';
const client = new MercadoPagoConfig({ accessToken: mercadopagoAccessToken });

//Defino un puerto en donde se ejecutara mi aplicacion
const port = 8000;

// Agrega las rutas de tu aplicación
app.use('/products', productRouter);
app.use('/categorias', categoriaRouter);
app.use('/auth', authRouter);
app.use('/buscar', buscar);

// Ruta para crear preferencias de MercadoPago
app.post('/create_preference', async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unit_price),
                    currency_id: "ARS",
                },
            ],
            auto_return: "approved",
        };

        // Utiliza el método create de la instancia client de MercadoPagoConfig
        const preference = await client.createPreference(body);

        // Envía el ID de la preferencia en la respuesta
        res.json({
            id: preference.body.id,
        });
    } catch (error) {
        console.error(error); // Loggea el error en la consola
        res.status(500).json({
            error: "Error al crear la preferencia: " + error.message, // Proporciona un mensaje de error específico
        });
    }
});

// Conexión a la base de datos y inicio del servidor
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a la base de datos');
        app.listen(port, () => {
            console.log(`Aplicación ejecutándose en el puerto ${port}`);
        });
    })
    .catch(error => console.error('Error al conectar con la base de datos:', error));
