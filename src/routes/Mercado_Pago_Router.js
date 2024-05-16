const { Router } = require("express");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

Mercado_Pago.post("/", async (req, res) => {
    const servicio = req.body;
    const client = new MercadoPagoConfig({
        accessToken: process.env.ACCESS_TOKEN
    })
    try {
        const preference = new Preference(client)
        const result = await preference.create({
            body: {
                items: [
                    {
                        title: servicio.title,
                        unit_price: servicio.unit_price,
                        currency_id: servicio.currency_id,
                        quantity: servicio.quantity,
                    },
                ],

                back_urls: {
                    success: "https://stockmanager-oficial.vercel.app/",
                    failure: "https://stockmanager-oficial.vercel.app/fallo",
                },

                auto_return: "approved",
            }
        })

        console.log(result);
        res.status(200).json({ result: result.init_point });
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

module.exports = Mercado_Pago;

