const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Categoria = require("../models/categoria.model");
const Producto = require("../models/products.model");

const coleccionesPermitidas = ["categories", "products"];

const buscarCategorias = async (termino = "", res = response) => {
  // Verificar si me mandó el id
  const isMongoID = ObjectId.isValid(termino);
  if (isMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  // Si la búsqueda se hace por el nombre
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("nombre", "nombre");

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  // Verificar si me mandó el id
  const isMongoID = ObjectId.isValid(termino);
  if (isMongoID) {
    const producto = await Producto.findById(termino);
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  // Si la búsqueda se hace por marca, producto, categoría o vencimiento
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    $or: [
      { marca: regex },
      { producto: regex },
      { categoria: regex },
      { vencimiento: regex },
    ],
    estado: true,
  }).populate("marca", "marca").populate("producto", "producto");

  res.json({
    results: productos,
  });
};

const buscar = async (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  // Ver si la coleccion esta en las permitidas
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
    });
  }

  // Verificar qué colección se recibió
  switch (coleccion) {
    case "categories":
      buscarCategorias(termino, res);
      break;
    case "products":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No hay búsqueda para esta acción",
      });
      break;
  }
};

module.exports = {
  buscar,
};
