import React, { useState, useEffect, useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTareas = () => {
  const initialState = {
    nombre: "",
  };
  const [tareaForm, setTareaForm] = useState(initialState);
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    tarea,
    errorTarea,
    obtenerTareas,
    agregarTarea,
    validarTarea,
    editarTarea,
    limpiarTarea,
  } = tareasContext;

  //useEffect me detecta una tarea seleccionada
  useEffect(() => {
    if (tarea !== null) {
      setTareaForm(tarea);
    } else {
      setTareaForm({
        nombre: "",
      });
    }
  }, [tarea]);

  //Si un proyecto esta seleccionado
  if (!proyecto) return null;

  //Array destrucuting para extraer el proyecto actual
  //console.log(proyecto);
  const [proyectoActual] = proyecto;
  //console.log(proyectoActual);

  //Leer valores del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTareaForm({
      ...tareaForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (tareaForm.nombre.trim() === "") {
      validarTarea();
      return;
    }
    //revisar si es edicion o nueva tarea
    //Si es igual a null es nueva tarea
    if (tarea === null) {
      //agregar la tareaForm
      tareaForm.proyecto = proyectoActual._id;
      agregarTarea(tareaForm);
    } else {
      //Si no es null es edicion
      editarTarea(tareaForm);
      limpiarTarea();
    }

    //Volver a filtrar las tareas
    obtenerTareas(proyectoActual._id);
    //reiniciar el form
    setTareaForm(initialState);
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
            value={tareaForm.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-inpu">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tarea === null ? "Agregar Tarea" : "Editar Tarea"}
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
