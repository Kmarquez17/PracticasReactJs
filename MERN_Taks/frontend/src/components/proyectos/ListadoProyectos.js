import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
const ListadoProyectos = () => {
  //Extraer proyecto del state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  //Obtener proyecto cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
    //eslint-disable-next-line
  }, []);

  //Si proyecto tiene datos
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno :(</p>;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map((proyecto, index) => (
          <CSSTransition key={index} timeout={200} className={"proyecto"}>
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};
export default ListadoProyectos;

const Proyecto = ({ proyecto }) => {
  //Obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  //Obtener el state de tareas
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  //Funcion para agregar el proyecto Actual
  const SeleccionarProyecto = (id) => {
    proyectoActual(id); // Fijar el proyecto Actual
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => SeleccionarProyecto(proyecto.id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};
