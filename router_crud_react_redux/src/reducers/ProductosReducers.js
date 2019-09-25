import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_LISTADO_PRODUCTOS,
  LISTADO_PRODUCTOS_EXITOSA,
  LISTADO_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITOSO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITOSO,
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDITAR_PRODUCTO,
  PRODUCTO_EDITADO_EXITOSO,
  PRODUCTO_EDITADO_ERROR
} from "../types";

//Cada reducers tiene su State
const initialState = {
  productos: [],
  error: null,
  loading: false,
  producto: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO /** */:
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
        loading: true,
        producto: {}
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

    case OBTENER_PRODUCTO_ELIMINAR /** */:
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

    case OBTENER_PRODUCTO_EDITAR /** */:
      return {
        ...state,
        error: null
      };

    case PRODUCTO_EDITAR_EXITOSO:
      return {
        ...state,
        error: null,
        producto: action.payload
      };

    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        error: true
      };

    case COMENZAR_EDITAR_PRODUCTO /** */:
      return {
        ...state,
        error: null
      };

    case PRODUCTO_EDITADO_EXITOSO:
      return {
        ...state,
        error: null,
        productos: state.productos.map(
          //Iteramos los productos
          producto =>
            producto.id === action.payload.id // buscamos por ID el producto,
              ? (producto = action.payload) // si el ID se encuentra se re-escribe en el estado
              : producto // si el ID no se encuentra no se modificanada
        )
      };

    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}
