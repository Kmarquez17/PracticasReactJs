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
//Listar todos los proyectos de x usuario
router.get("/", auth, ctrProyectos.listadoProyectos);

//Actualizar un proyecto
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  ctrProyectos.actualizarProyecto
);

//Eliminar un proyecto
router.delete("/:id", auth, ctrProyectos.eliminarProyecto);

module.exports = router;
