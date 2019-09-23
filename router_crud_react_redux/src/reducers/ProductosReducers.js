import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_LISTADO_PRODUCTOS,
  LISTADO_PRODUCTOS_EXITOSA,
  LISTADO_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITOSO,
  PRODUCTO_ELIMINADO_ERROR
} from "../types";

//Cada reducers tiene su State
const initialState = {
  productos: [],
  error: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        error: null
      };

    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        error: null,
        productos: [...state.productos, action.payload]
      };

    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        error: true
      };

    case COMENZAR_LISTADO_PRODUCTOS:
      return {
        ...state,
        loading: true
      };
    case LISTADO_PRODUCTOS_EXITOSA:
      return {
        ...state,
        productos: action.payload,
        error: null,
        loading: false
      };
    case LISTADO_PRODUCTOS_ERROR:
      return {
        ...state,
        productos: [],
        loading: false,
        error: true
      };

    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        error: null
      };
    case PRODUCTO_ELIMINADO_EXITOSO:
      return {
        ...state,
        error: null,
        productos: state.productos.filter(
          producto => producto.id !== action.payload
        )
      };
    case PRODUCTO_ELIMINADO_ERROR:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
}
