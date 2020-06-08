//Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const ctrAuth = require("../controllers/ctrAuth");

//Crear un usuario
//api/auth
router.post("/", [
  check("email", "Agrega un email valido").isEmail(),
  check("password", "El password debe ser minimo de 6 caracteres ").isLength({
    min: 6,
  }),
  ctrAuth.autenticarUsuario,
]);

router.get("/", auth, ctrAuth.usuarioAutenticado);

module.exports = router;
