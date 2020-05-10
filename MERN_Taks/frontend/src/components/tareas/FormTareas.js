import React, { useState, useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTareas = () => {
  const initialState = {
    nombre: "",
  };
  const [tarea, setTarea] = useState(initialState);
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    obtenerTareas,
    agregarTarea,
    validarTarea,
  } = tareasContext;

  //Si un proyecto esta seleccionado
  if (!proyecto) return null;

  //Array destrucuting para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer valores del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTarea({
      ...tarea,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (tarea.nombre.trim() === "") {
      validarTarea();
      return;
    }
    //pasar la validacion
    //agregar la tarea
    tarea.proyectoId = proyectoActual.id;
    tarea.estado = false;

    agregarTarea(tarea);

    //Volver a filtrar las tareas
    obtenerTareas(proyectoActual.id);
    //reiniciar el form
    setTarea(initialState);
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={tarea.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-inpu">
          <input
            type="submit"
            className="btn btn-primario bnt-block"
            value="Agregar Tarea"
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTareas;
