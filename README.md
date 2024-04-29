# Stock Manager

Este proyecto final, desarrollado como parte del programa de estudios en Rolling Code School, surge de una necesidad real que observé mientras trabajaba en una distribuidora de alimentos. Noté que tenían dificultades en el control de stock de sus productos debido a métodos obsoletos y poco precisos.

Inicialmente, llevaban un registro manual de los productos que ingresaban, anotando sus fechas de vencimiento en un cuaderno para luego trasladar estos datos a una hoja de cálculo. Esta práctica generaba pérdidas constantes debido al vencimiento del stock.

Decidí intervenir desarrollando una aplicación web completamente responsiva, diseñada para permitir un control minucioso de los productos desde la comodidad de un celular o una computadora de oficina.

La base de datos NoSQL que desarrollé para este proyecto cuenta con diferentes endpoints para diversas funcionalidades, indispensables para una gestión profesional de los productos. Para las validaciones, utilicé express-validator; para el manejo de los modelos, opté por mongoose debido a la elección de MongoDB como base de datos. Además, utilicé dotenv para manejar datos sensibles y JWT para gestionar de manera eficiente las autenticaciones y autorizaciones, tanto para el inicio de sesión como para la solicitud de cambios de contraseña.
## Instalación

1. Clona este repositorio en tu máquina local:
```
git clone https://github.com/219WD/backend-productmanager.git
```
2. Ingresa al directorio del proyecto:
```
cd backend-productmanager
```
3. Instala las dependencias:
```
npm install
```

## Uso

1. Asegúrate de que MongoDB esté instalado y en ejecución en tu máquina.
2. En la raíz del proyecto, crea un archivo .env y configura las variables de entorno necesarias con el env.template de ejemplo:
```
JWT_SECRET=D0S_D13C1NU3V3_S1GN
MONGO_URI=mongodb+srv://macgunmanmc:EAvvsvNtBO2jKSgL@productmanager.quuq3cy.mongodb.net/?retryWrites=true&w=majority&appName=productmanager
```
3. Ejecuta el servidor de Node.js:
```
nodemon main.js
```

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- Dotenv
- Cors
- Bcryptjs
- Nodemailer

## Desarrollado por:
- [Juan Canepa]

