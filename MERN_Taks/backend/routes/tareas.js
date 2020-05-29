const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const ctrTareas = require("../controllers/ctrTareas");

//Crear un tarea
//api/tareas
router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty(),
    check("nombre", "El el proyecto es obligatorio").not().isEmpty(),
  ],
  ctrTareas.crearTareas
);
//Listar todas los tareas por proyecto
router.get("/", auth, ctrTareas.listadoTareas);

//Actualizar un proyecto
router.put("/:id", auth, ctrTareas.actualizarTarea);

//Eliminar un proyecto
router.delete("/:id", auth, ctrTareas.eliminarTarea);

module.exports = router;
