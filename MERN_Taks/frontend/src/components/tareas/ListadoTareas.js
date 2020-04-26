import React, { useContext, Fragment } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //Si no hay proyecto selecccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  //Array destrucuting para extraer el proyecto actual

  const [proyectoActual] = proyecto;
  //console.log(proyectoActual);

  const tareasProyecto = [
    { nombre: "Elegir Plataforma", estado: false },
    { nombre: "Elegir Colores", estado: true },
    { nombre: "Elegir Plataforma de pago", estado: true },
    { nombre: "Elegir Hostig", estado: false },
  ];
  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length > 0 ? (
          tareasProyecto.map((tarea, index) => (
            <Tareas tarea={tarea} key={index} />
          ))
        ) : (
          <li className="tarea">No hay Tareas</li>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => {
          eliminarProyecto(proyectoActual.id);
        }}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

const Tareas = ({ tarea }) => {
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo">
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto">
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario">
          Editar
        </button>
        <button type="button" className="btn btn-secundario">
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default ListadoTareas;
