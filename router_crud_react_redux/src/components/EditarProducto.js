import React, { useEffect, Fragment, useRef } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";

//Acciones
import {
  obtenerProductoEditarActions,
  editarProductoActios
} from "../actions/ProductosActions";
import {
  validarFormularioActions,
  validacionExitoActions,
  validacionErrorActions
} from "../actions/ValidacionActions";

import Swal from "sweetalert2";

const EditarProducto = ({ history, match }) => {
  //Creando los refs
  const nombreRef = useRef("");
  const precioRef = useRef("");
  const { id } = match.params;

  //Creando dispacth
  const dispatch = useDispatch();

  //Funciones
  const editarProducto = producto => dispatch(editarProductoActios(producto));
  const validarFormulario = () => dispatch(validarFormularioActions());
  const exitoValidacion = () => dispatch(validacionExitoActions());
  const errorValidacion = () => dispatch(validacionErrorActions());

  useEffect(() => {
    dispatch(obtenerProductoEditarActions(id));
  }, []);

  //Funciones
  const handleSubmit = e => {
    e.preventDefault();

    //Validar Formulario
    validarFormulario();

    if (
      nombreRef.current.value.trim() === "" ||
      precioRef.current.value.trim() === ""
    ) {
      errorValidacion();
      return;
    }

    //No hay error
    exitoValidacion();

    //Guardar los cambios
    editarProducto({
      id,
      nombre: nombreRef.current.value,
      precio: precioRef.current.value
    });

    //Mensaje de Edicion
    Swal.fire("Alamcenado", "Producto actualizacon correctamente", "success");

    //Redireccionar
    history.push("/");
  };

  //Acceder al state
  const producto = useSelector(state => state.productos.producto);
  //Error a la hora de obtener el producto
  const errorProd = useSelector(state => state.productos.error);

  //Error a la hora de validar el formulario con campos vacios
  const errorVal = useSelector(state => state.error.error);

  if (!producto) return <p>Cargando producto ..!</p>;
  return (
    <Fragment>
      {errorProd ? (
        <div className="alert alert-danger text-center mt-4">
          Hubo un error, intente de nuevo...!
        </div>
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="text-center">Editar Producto</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Titulo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Titulo"
                      defaultValue={producto.nombre}
                      ref={nombreRef}
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Precio"
                      defaultValue={producto.precio}
                      ref={precioRef}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                  >
                    Guardar Cambios
                  </button>
                </form>
                {errorVal ? (
                  <div className="alert alert-danger text-center mt-4">
                    Todos los campos Oblogatorios
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditarProducto;
