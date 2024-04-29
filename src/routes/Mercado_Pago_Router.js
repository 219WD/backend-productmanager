// const { Router } = require("express");
// const mercadopago = require("mercadopago");
// const dotenv = require("dotenv");
// dotenv.config();
// const Mercado_Pago = Router();

// mercadopago.configure({
//   access_token: process.env.ACCESS_TOKE || "",
// });

// Mercado_Pago.post("/", async (req, res) => {
//   const servicio = req.body;

//   try {
//     const preference = {
//       items: [
//         {
//           title: servicio.nombre,
//           unit_price: servicio.precio,
//           currency_id: "ARS",
//           quantity: servicio.cantidad,
//         },
//       ],

//       back_urls: {
//         success: "http://localhost:5174/",
//         failure: "http://localhost:8000/fallo",
//       },

//       auto_return: "approved",
//     };

//     const respuesta = await mercadopago.preferences.create(preference);
//     console.log(respuesta);
//     res.status(200).json(respuesta.response.init_point);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json(error.message);
//   }
// });

// module.exports = Mercado_Pago;

//No tuve suerte para integrar mercadopago aun, pero como no descarte la opcion de solucionarlo, decidi no eliminarlo.