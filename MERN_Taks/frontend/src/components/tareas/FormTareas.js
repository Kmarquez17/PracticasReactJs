import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

const FormTareas = () => {
  // const [state, setstate] = useState(initialState);
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Si un proyecto esta seleccionado
  if (!proyecto) return null;

  //Array destrucuting para extraer el proyecto actual
  //const [proyectoActual] = proyecto;

  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
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
    </div>
  );
};

export default FormTareas;
