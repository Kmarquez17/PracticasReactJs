const express = require("express");
const connectDataBase = require("./config/db");

//Crear el servidor
const app = express();

//Conectar al base datos
connectDataBase();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar todas las rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));

//Definicion de la pagina principal
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});
//Arrancar el servidor

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
