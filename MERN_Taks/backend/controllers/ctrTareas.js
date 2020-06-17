const Tareas = require("../models/Tareas");
const Proyectos = require("../models/Proyectos");

const { validationResult } = require("express-validator");

const Errores = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errores: errors.array() });
    return false;
  }
  return true;
};

const verficarProyectoUsuario = async (res, req, proyecto) => {
  //Consultamos si existe proyecto
  const existeProyecto = await Proyectos.findById(proyecto);
  if (!existeProyecto) {
    res.status(404).json({ msg: "No existe proyecto" });
    return false;
  }

  //Revisar si el proyecto actual pertece al usuario autenticado
  if (existeProyecto.creador.toString() !== req.usuario.id) {
    res.status(401).json({ msg: "No Autorizado" });
    return false;
  }

  return true;
};

//Crear tareas para un proyecto
exports.crearTareas = async (req, res) => {
  //Revisara si hay errores
  if (!Errores(req, res)) return;

  const { proyecto } = req.body;
  try {
    if (!(await verficarProyectoUsuario(res, req, proyecto))) return;

    const tarea = new Tareas(req.body);
    await tarea.save();
    res.status(200).json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Obtiene las tareas por proyectos
exports.listadoTareas = async (req, res) => {
  const { proyecto } = req.query;
  try {
    if (!(await verficarProyectoUsuario(res, req, proyecto))) return;

    //Obtener las tareas por proyectos
    const tareas = await Tareas.find({ proyecto: proyecto }).sort({
      creado: -1,
    });

    res.status(200).json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
exports.actualizarTarea = async (req, res) => {
  const { proyecto, nombre, estado } = req.body;
  const { id } = req.params;
  try {
    if (!(await verficarProyectoUsuario(res, req, proyecto))) return;

    // crear objeto con la nueva informacion
    let nuevaTarea = {};

    //Si manda el nombre
    nuevaTarea.nombre = nombre;

    //Si manda el estado
    nuevaTarea.estado = estado;
   // console.log(nuevaTarea);

    //Consultamos si existe tarea
    let tarea = await Tareas.findById(id);
    if (!tarea) {
      res.status(404).json({ msg: "No existe tarea" });
      return false;
    }

    //Actualizar las tarea
    tarea = await Tareas.findByIdAndUpdate(
      { _id: id },
      { $set: nuevaTarea },
      { new: true }
    );

    res.status(200).json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
exports.eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const { proyecto } = req.query;
  try {
    if (!(await verficarProyectoUsuario(res, req, proyecto))) return;
    //Consultamos si existe tarea
    let tarea = await Tareas.findById(id);
    if (!tarea) {
      res.status(404).json({ msg: "No existe tarea" });
      return false;
    }
    //Eliminar el tarea
    await Tareas.findOneAndRemove({ _id: id });
    res.status(200).json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
