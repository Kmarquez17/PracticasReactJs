import React, { useState } from "react";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const AgregarProductos = ({ history, setRecargar }) => {
  //Estados
  const [nombrePlatillo, setNombrePlatillo] = useState("");
  const [precioPlatillo, setPrecioPlatillo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias] = useState([
    {
      name: "categoria",
      type: "radio",
      value: "Postre"
    },
    {
      name: "categoria",
      type: "radio",
      value: "Bebidas"
    },
    {
      name: "categoria",
      type: "radio",
      value: "Cortes"
    },
    {
      name: "categoria",
      type: "radio",
      value: "Ensaladas"
    }
  ]);

  const [error, setError] = useState(false);

  const agregarProductos = async e => {
    e.preventDefault();

    //Validamos que los datos no vayan vacios
    if (nombrePlatillo === "" || precioPlatillo === "" || categoria === "") {
      setError(true);
      return;
    }

    setError(false);

    //Crear el nuevo producto
    try {
      const URL = `http://localhost:4000/restaurant`;
      const resultado = await axios.post(URL, {
        nombrePlatillo,
        precioPlatillo,
        categoria
      });
      console.log(resultado);

      if (resultado.status === 201) {
        Swal.fire(
          "Producto Creado",
          "El producto se creo correctamente",
          "success"
        );
      }
    } catch (error) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "Hubo un error, vuelve a intentar"
      });
    }

    //Rederigir al usuario a productos
    setRecargar(true);
    history.push("/productos");
  };

  return (
    <div className="col-md-8 mx-auto">
      <h1 className="text-center">Agregar Nuevo Producto</h1>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <form className="mt-5" onSubmit={agregarProductos}>
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre Platillo"
            onChange={e => {
              setNombrePlatillo(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            placeholder="Precio Platillo"
            onChange={e => {
              setPrecioPlatillo(e.target.value);
            }}
          />
        </div>

        <legend className="text-center">Categoría:</legend>
        <div className="text-center">
          {categorias.map((categoria, i) => (
            <div key={i} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type={categoria.type}
                name={categoria.name}
                value={categoria.value}
                onChange={e => {
                  setCategoria(e.target.value);
                }}
              />
              <label className="form-check-label">{categoria.value}</label>
            </div>
          ))}
        </div>
        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Agregar Producto"
        />
      </form>
    </div>
  );
};

export default withRouter(AgregarProductos);
