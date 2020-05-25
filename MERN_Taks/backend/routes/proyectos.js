const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const ctrProyectos = require("../controllers/ctrProyectos");

//Crear un proyecto
//api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  ctrProyectos.crearProyectos
);
router.get("/", auth, ctrProyectos.listadoProyectos);

module.exports = router;
