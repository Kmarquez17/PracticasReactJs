import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  VALIDAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types/index";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tarea: null,
  };

  //State y dispatch
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear las funciones
  //Obtener las tareas en especifico
  const obtenerTareas = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", {
        params: { proyecto },
      });

      dispatch({
        type: TAREAS_PROYECTO,
        payload: respuesta.data.tareas,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  //Agregar una tarea al proyecto seleccionado
  const agregarTarea = async (tarea) => {
    try {
      const respuesta = await clienteAxios.post("/api/tareas", tarea);

      dispatch({ type: AGREGAR_TAREA, payload: respuesta.data });
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar Tarea
  const eliminarTarea = async (id, proyecto) => {
    // console.log(proyecto);
    try {
      await clienteAxios.delete(`api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Valida y crea un error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //Edita una tarea
  const editarTarea = async (tarea) => {
    try {
      const respuesta = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );

      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: respuesta.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Seleccionando la tarea actual
  const tareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Elimina la tarea seleccionada
  const limpiarTarea = (params) => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  return (
    <TareaContext.Provider
      value={{
        //tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tarea: state.tarea,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,

        tareaActual,
        editarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
