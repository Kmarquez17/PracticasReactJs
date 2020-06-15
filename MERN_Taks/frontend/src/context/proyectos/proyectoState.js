import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import clienteAxios from "../../config/axios";

import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR,
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
    mensaje: null,
  };

  //Dispatch para ejecutar las accines

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //Series de funciones
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: respuesta.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //Agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const respuesta = await clienteAxios.post("/api/proyectos", proyecto);

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //valida el formulario por errores
  const mostarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Selecciona el proyecto del usuario que dio CLIK
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
