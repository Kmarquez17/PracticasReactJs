import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  VALIDAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types/index";
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: state.tareas.filter(
          (tarea) => tarea.proyectoId === action.payload
        ),
      };

    case AGREGAR_TAREA:
      return {
        ...state,
        tareas: [action.payload, ...state.tareas],
        errorTarea: false,
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };

    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };

    case ESTADO_TAREA:
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? action.payload : tarea
        ),
        //tarea: null,
      };

    case TAREA_ACTUAL:
      return {
        ...state,
        tarea: action.payload,
      };

    case LIMPIAR_TAREA:
      return {
        ...state,
        tarea: null,
      };

    default:
      return state;
  }
};