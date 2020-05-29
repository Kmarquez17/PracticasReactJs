const express = require("express");
const cors = require("cors");
const connectDataBase = require("./config/db");

//Crear el servidor
const app = express();
//Puerto de la app
const PORT = process.env.PORT || 4000;

//Conectar al base datos
connectDataBase();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Habilitar los cors
app.use(cors());
//Usar los headers del cors
app.use((req, res, next) => {
  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Metodos de solicitud que deseas permitir
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

//Importar todas las rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//Definicion de la pagina principal
app.get("/", (req, res) => {
  res.send("Hola Mundo");
});
//Arrancar el servidor

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
