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

import clienteAxios from "../config/Axios";

/** Crear un producto*/
export function agregarProductoActions(producto) {
  return dispatch => {
    dispatch(agregarProducto());
    //Insertar en la API
    clienteAxios
      .post("/libros", producto)
      .then(resp => {
        //Se inserta correctamente
        dispatch(agregarProductoExito(producto));
        console.log(resp);
      })
      .catch(error => dispatch(agregarProductoError(true)));
  };
}

export const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

export const agregarProductoError = () => ({
  type: AGREGAR_PRODUCTO_ERROR
});

/** Obtener el listado de los productos*/
export function listadoProductosActions() {
  return dispatch => {
    dispatch(listadoProductosComienzo());

    //Consultar API
    clienteAxios
      .get("/libros")
      .then(respuesta => dispatch(listadoProductosExito(respuesta.data)))
      .catch(error => dispatch(listadoProductosError()));
  };
}

export const listadoProductosComienzo = () => {
  return {
    type: COMENZAR_LISTADO_PRODUCTOS
  };
};

export const listadoProductosExito = productos => {
  return {
    type: LISTADO_PRODUCTOS_EXITOSA,
    payload: productos
  };
};

export const listadoProductosError = () => {
  return {
    type: LISTADO_PRODUCTOS_ERROR
  };
};

/** Eliminando productos*/
export function eliminarProductoActions(id) {
  debugger
  return dispatch => {
    dispatch(obtenerProductoEliminar());
    clienteAxios
      .delete(`/libros/${id}`)
      .then(resp => dispatch(productoEliminadoExitoso(id)))
      .catch(error => dispatch(productoEliminadoError()));
  };
}

export const obtenerProductoEliminar = () => {
  return {
    type: OBTENER_PRODUCTO_ELIMINAR
  };
};

export const productoEliminadoExitoso = id => {
  return {
    type: PRODUCTO_ELIMINADO_EXITOSO,
    payload: id
  };
};

export const productoEliminadoError = () => {
  return {
    type: PRODUCTO_ELIMINADO_ERROR
  };
};

/*Obtener Producto a editar*/
export function obtenerProductoEditarActions(id) {
  return dispatch => {
    dispatch(obtenerProductoEditar());
    //Obtener producto de la API
    clienteAxios
      .get(`/libros/${id}`)
      .then(resp => dispatch(productoEditarExitoso(resp.data)))
      .catch(error => dispatch(productoEditarError()));
  };
}

export const obtenerProductoEditar = () => {
  return {
    type: OBTENER_PRODUCTO_EDITAR
  };
};

export const productoEditarExitoso = producto => {
  return {
    type: PRODUCTO_EDITAR_EXITOSO,
    payload: producto
  };
};

export const productoEditarError = () => {
  return {
    type: PRODUCTO_EDITAR_ERROR
  };
};

/*Editar el producto */

export function editarProductoActios(producto) {
  return dispatch => {
    dispatch(editadoProductoComienzo());
    clienteAxios
      .put(`/libros/${producto.id}`, producto)
      .then(resp => dispatch(editadoProductoExitoso(resp.data)))
      .catch(error => dispatch(editadoProductoError()));
  };
}

export const editadoProductoComienzo = () => {
  return {
    type: COMENZAR_EDITAR_PRODUCTO
  };
};

export const editadoProductoExitoso = producto => {
  return {
    type: PRODUCTO_EDITADO_EXITOSO,
    payload: producto
  };
};

export const editadoProductoError = () => {
  return {
    type: PRODUCTO_EDITADO_ERROR
  };
};
