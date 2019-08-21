import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductosListado = ({ producto, setRecargar }) => {
  const eliminarProducto = id => {
    console.log(id);

    Swal.fire({
      title: "¿Estas Seguro?",
      text: "Un platillo elimando no se puede recuperar!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.value) {
        try {
          const URL = `http://localhost:4000/restaurant/${id}`;
          const resultado = await axios.delete(URL);
          if (resultado.status === 200) {
            setRecargar(true);
            Swal.fire("Eliminado!", "El producto se ha eliminado", "success");
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            type: "error",
            title: "Error",
            text: "Hubo un error, vuelve a intentar"
          });
        }
      }
    });
  };

  return (
    <li
      data-categoria={producto.categoria}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <p>
        {producto.nombrePlatillo}{" "}
        <span className="font-weight-bold">{producto.precioPlatillo}</span>
      </p>
      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            eliminarProducto(producto.id);
          }}
        >
          Eliminar &times;
        </button>
      </div>
    </li>
  );
};

export default ProductosListado;
