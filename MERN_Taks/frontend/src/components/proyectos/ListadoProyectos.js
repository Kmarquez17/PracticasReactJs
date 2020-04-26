import React, { useContext, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
const ListadoProyectos = () => {
  //Extraer proyecto del state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  //Obtener proyecto cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
  }, []);

  //Si proyecto tiene datos
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creano uno :(</p>;

  return (
    <ul className="listado-proyectos">
      {proyectos.map((proyecto, index) => (
        <Proyecto proyecto={proyecto} key={index} />
      ))}
    </ul>
  );
};
export default ListadoProyectos;

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => proyectoActual(proyecto.id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};
