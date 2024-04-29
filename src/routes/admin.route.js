const { Router } = require("express");
const { check, validationResult, param } = require("express-validator");
const User = require("../models/user.model");

const adminRouter = Router();

// Endpoint para obtener la lista de todos los usuarios
adminRouter.get('/allUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
});

// Endpoint para obtener la lista de usuarios administradores
adminRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find({ esEmpleado: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Endpoint para subir de rango a Administrador a un usuario por su ID
adminRouter.put(
  "/promotion/:userId",
  [
    param("userId", "Debe mandar un ID de usuario válido").isMongoId(),
    check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { isAdmin } = req.body;
      if (!isAdmin) {
        return res.status(400).json({ message: "Debe ser Administrador" });
      }

      const userId = req.params.userId;
      const update = { esEmpleado: true };
      await User.findByIdAndUpdate(userId, update);

      res.json({ message: "Actualización exitosa" });
    } catch (error) {
      res.status(500).json({ error: "Error en la promoción de usuario" });
    }
  }
);

// Endpoint para remover el rango de administrador a un usuario por su ID
adminRouter.put(
  "/demotion/:userId",
  [
    param("userId", "Debe mandar un ID de usuario válido").isMongoId(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.params.userId;
      const update = { esEmpleado: false }; // Aquí actualizas esEmpleado a false
      await User.findByIdAndUpdate(userId, update);

      res.json({ message: "Actualización exitosa" });
    } catch (error) {
      res.status(500).json({ error: "Error al remover el rango de administrador" });
    }
  }
);


//Endpoint para eliminar definitivamente a un usuario de la Base de Datos
adminRouter.delete(
  "/delete",
  [
    check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
    check("id", "Debe mandar un Id valido").isMongoId(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const { isAdmin } = req.body;
      if (!isAdmin) {
        return res.status(400).json({ message: "Debe ser Administrador" });
      }

      await User.deleteOne({ _id: req.body.id });
      res.json({ message: "Borrado exitoso" });
    } catch (error) {
      res.status(500).json({ error: "Error al borrar usuario" });
    }
  }
);

// Endpoint para cambiar la contraseña de un usuario por su ID
adminRouter.put('/changePassword/:id', [
  check('password', "Debe mandar una contraseña").notEmpty(),
  check('password', "Debe ser alphanumerica").isAlphanumeric(),
], async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.password = password;
    await user.save();

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al cambiar la contraseña del usuario" });
  }
});


module.exports = adminRouter;
