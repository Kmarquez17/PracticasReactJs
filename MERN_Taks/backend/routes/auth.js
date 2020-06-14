//Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ctrAuth = require("../controllers/ctrAuth");

//Crear un usuario
//api/auth
router.post("/", ctrAuth.autenticarUsuario);

router.get("/", auth, ctrAuth.usuarioAutenticado);

module.exports = router;
