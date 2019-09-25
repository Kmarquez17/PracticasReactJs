import React, { useEffect } from "react";
import Swal from "sweetalert2";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  listadoProductosActions,
  eliminarProductoActions
} from "../actions/ProductosActions";
import { Link } from "react-router-dom";

const Productos = () => {
  //Mandar a llamar la accion que listara todos los productos alamcenados en el servicio

  const dispatch = useDispatch();

  useEffect(() => {
    //Productos cuando el componente este listo
    const cargarProductos = () => dispatch(listadoProductosActions());
    cargarProductos();
  }, []);

  //Acceder al state
  const productos = useSelector(state => state.productos.productos);
  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);

  //Funcion Eliminar producto
  const EliminarProducto = id => {
    debugger
    //Preguntar al usuario
    Swal.fire({
      title: "¿Estás seguro?",
      text: "un producto eliminado no se puede recuperar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        dispatch(eliminarProductoActions(id));
        Swal.fire(
          "Eliminado!",
          "El producto se elimino correctamente",
          "success"
        );
      }
    });
  };

  return (
    <React.Fragment>
      {error ? (
        <div className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un Error...
        </div>
      ) : null}
      <React.Fragment>
        <h2 className="text-center my-5">Listado de Productos</h2>

        <table className="table table-striped">
          <thead className="bg-primary table-dark">
            <tr>
              {/* <th scope="col">#</th> */}
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                {/* <th scope="row">{producto.id}</th> */}
                <td>{producto.nombre}</td>
                <td>
                  <span className='font-weight-bold'>${producto.precio}</span>
                </td>
                <td className="acciones">
                  <Link
                    to={`/producto/editar/${producto.id}`}
                    className="btn btn-primary mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      EliminarProducto(producto.id);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading ? "Cargando..." : null}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Productos;
