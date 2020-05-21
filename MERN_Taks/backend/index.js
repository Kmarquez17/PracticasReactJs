const express = require("express");
const connectDataBase = require("./config/db");

//Crear el servidor
const app = express();

//Conectar al base datos
connectDataBase();

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Definicion de la pagina principal
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});
//Arrancar el servidor

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
