const Proyectos = require("../models/Proyectos");
const { validationResult } = require("express-validator");
//Crear proyectos
exports.crearProyectos = async (req, res) => {
  //Revisara si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
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
    const proyectos = await Proyectos.find({ creador: req.usuario.id });
    res.status(200).json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
