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

//Crear proyectos
exports.crearProyectos = async (req, res) => {
  //Revisara si hay errores
  if (!Errores(req, res)) return;
  try {
    const proyecto = await new Proyectos(req.body);
    //Guardar el creador mediante jwt
    proyecto.creador = req.usuario.id;
    //Guardamos el proyecto
    proyecto.save();
    res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Visualizar protectos por ID usuario
exports.listadoProyectos = async (req, res) => {
  try {
    const proyectos = await Proyectos.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.status(200).json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

//Actualizar el proyecto
exports.actualizarProyecto = async (req, res) => {
  //Revisara si hay errores
  if (!Errores(req, res)) return;

  //Extraer la informacion del proyecto
  const { nombre } = req.body;
  const { id } = req.params;
  const nuevoProyecto = {};
  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }
  try {
    //Revisar el ID
    let proyecto = await Proyectos.findById(id);
    //Revisar que exita un proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no econtrado" });
    }

    //Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //Actualizar proyecto
    proyecto = await Proyectos.findByIdAndUpdate(
      { _id: id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    if (err.kind === "ObjectId") {
      res.status(404).json({
        message: "Task does not exist",
      });
    } else {
      res.status(500).send("Hubo un error");
    }
  }
};

//Eliminar un proyecto por su ID
exports.eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    //Revisar el ID
    let proyecto = await Proyectos.findById(id);
    //Revisar que exita un proyecto
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no econtrado" });
    }

    //Verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    //Eliminar el proyecto
    await Proyectos.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
