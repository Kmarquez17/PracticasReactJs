import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  VALIDAR_TAREA,
} from "../../types/index";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir Plataforma", estado: false, proyectoId: 1 },
      { id: 2, nombre: "Elegir Colores", estado: true, proyectoId: 2 },
      {
        id: 3,
        nombre: "Elegir Plataforma de pago",
        estado: true,
        proyectoId: 3,
      },
      { id: 4, nombre: "Elegir Hostig", estado: false, proyectoId: 4 },
      { id: 5, nombre: "Elegir Plataforma", estado: false, proyectoId: 4 },
      { id: 6, nombre: "Elegir Colores", estado: true, proyectoId: 3 },
      {
        id: 7,
        nombre: "Elegir Plataforma de pago",
        estado: true,
        proyectoId: 2,
      },
      { id: 8, nombre: "Elegir Hostig", estado: false, proyectoId: 1 },
      { id: 9, nombre: "Elegir Plataforma", estado: false, proyectoId: 3 },
      { id: 10, nombre: "Elegir Colores", estado: true, proyectoId: 1 },
      {
        id: 11,
        nombre: "Elegir Plataforma de pago",
        estado: true,
        proyectoId: 4,
      },
      { id: 12, nombre: "Elegir Hostig", estado: false, proyectoId: 2 },
    ],
    tareasProyecto: null,
    errorTarea: false,
  };

  //State y dispatch
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear las funciones
  //Obtener las tareas en especifico
  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  //Agregar una tarea al proyecto seleccionado
  const agregarTarea = (tarea) => {
    dispatch({ type: AGREGAR_TAREA, payload: tarea });
  };

  //Eliminar Tarea
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };
  //Valida y crea un error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
