const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

// Configuracion Middleware con el Servidor de Autorización
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});

const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require("./routes/libros");

// Importamos el Router de Usuarios
const usuariosRouter = require("./routes/usuarios");

// Agregamos las rutas de usuarios, protegidas por el middleware de autenticación
app.use("/api/usuarios", autenticacion, usuariosRouter);

// Configuramos el middleware de autenticacion para las rutas de libros
app.use("/api/libros", autenticacion, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
