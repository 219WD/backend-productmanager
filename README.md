# Stock Manager

Proyecto Final integrador de Rolling Code School: Este proyecto nace de una necesidad, hace un tiempo estaba trabajando en una distribuidora de alimentos y me di cuenta que tenian problemas por el control de stock de sus productos ya que utilizaban metodos anticuados y no tan precisos. En un cuaderno anotaban los productos que ingresaban con sus fechas de vencimiento y posteriormente los pasaban a un excel, lo cual les generaba constantes perdidas por vencimiento de su stock. Ahi fue donde interveni yo con esta pagina 100 responsiva para que puedan controlar sus productos miniciosamente desde la comodidas de su celular o de la computadora de la oficina. La base de datos No Relacional que desarrolle para este proyecto tiene diferentes endpoints para diferentes funcionalidades totalmente necesarias para lograr de una manera profesional la administracion de los productos. Para las validaciones utilice express validator, para el manejo de los modelos utilice mongoose ya que elegi como base de datos MongoDb, para manejar los datos sensibles utilice dotenv y para manejar de una mejor manera las autenticaciones y autorizaciones tanto como para iniciar sesion como para solicitar un cambio de contraseña utilice JWT.
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
JWT_SECRET=
MONGO_URI=
```
3. Ejecuta el servidor de Node.js:
```
npm init
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

