import React, { useState, useContext, Fragment } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener el state del formulario proyecto
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostarError,
  } = proyectosContext;

  const [proyecto, setProyecto] = useState({
    nombre: "",
    // id: "",
  });

  const { nombre } = proyecto;

  //Lee el contenido del input
  const onChangeProyecto = (e) => {
    const { name, value } = e.target;
    setProyecto({
      ...proyecto,
      [name]: value,
    });
  };

  //Cuando el usuario envia informacion al servicio
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    //validar el proyecto
    if (nombre === "") {
      mostarError();
      return;
    }

    //Agregar al state
    agregarProyecto(proyecto);

    //Reiniciar el form
    setProyecto({ nombre: "" });
  };
  // console.log(formulario);

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primario btn-block"
        onClick={mostrarFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form onSubmit={onSubmitProyecto} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      ) : null}

      {errorFormulario ? (
        <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
