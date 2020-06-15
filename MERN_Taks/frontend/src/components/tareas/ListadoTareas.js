import React, { useContext, Fragment } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
const ListadoTareas = () => {
  //Obtener el state de Proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //Obtener el state de tareas
  const tareasContext = useContext(tareaContext);
  const {
    tareasProyecto,
    eliminarTarea,
    obtenerTareas,
    cambiarEstado,
    tareaActual,
  } = tareasContext;

  //Si no hay proyecto selecccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  //Array destrucuting para extraer el proyecto actual

  const [proyectoActual] = proyecto;
  //console.log(proyectoActual);

  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length > 0 ? (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
                <Tareas
                  tarea={tarea}
                  obtenerTareas={obtenerTareas}
                  eliminarTarea={eliminarTarea}
                  proyectoActual={proyectoActual}
                  cambiarEstado={cambiarEstado}
                  tareaActual={tareaActual}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          <li className="tarea">No hay Tareas</li>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => {
          eliminarProyecto(proyectoActual._id);
        }}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

const Tareas = ({
  tarea,
  eliminarTarea,
  obtenerTareas,
  proyectoActual,
  cambiarEstado,
  tareaActual,
}) => {
  const cambioState = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    cambiarEstado(tarea);
  };
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => {
              cambioState(tarea);
            }}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => {
              cambioState(tarea);
            }}
          >
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => {
            tareaActual(tarea);
          }}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => {
            eliminarTarea(tarea.id);
            obtenerTareas(proyectoActual.id);
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default ListadoTareas;
