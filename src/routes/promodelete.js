// authRouter.put("/promotion", [
//     check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
//     check("username", "Usuario debe ser alphanumerico").isAlphanumeric(),
//     check("username", "Debe mandar un nombre de usuario").notEmpty()
// ]
//     ,
//     async (req, res) => {
//         //Validando si encontramos algun error
//         const result = validationResult(req);

//         if (!result.isEmpty()) {
//             res.status(400)
//             res.send({ errors: result.array() });
//         }
//         if (req.body.isAdmin === false) {
//             res.status(400)
//             return res.json({ message: "Deberia ser Administrador" })
//         }

//         const username = req.body.username

//         const filter = { username };
//         const update = { esEmpleado: true };

//         await User.findOneAndUpdate(filter, update)

//         res.json({ message: "Actualizacion exitosa" })
//     })

// authRouter.delete("/delete", [
//     check("isAdmin", "Debe mandar un booleano como isAdmin").isBoolean(),
//     check("id", "Debe mandar un Id valido").isMongoId(),
// ], async (req, res) => {
//     const result = validationResult(req);

//     if (!result.isEmpty()) {
//         res.status(400)
//         res.send({ errors: result.array() });
//     }
//     if (req.body.isAdmin === false) {
//         res.status(400)
//         return res.json({ message: "Deberia ser Administrador" })
//     }

//     await User.deleteOne({ _id: req.body.id });
//     res.json({ message: "Borrado exitosamente" })
// })