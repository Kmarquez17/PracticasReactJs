import React, { useState, useRef, useEffect } from "react";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

const EditarProductos = ({ producto, history, setRecargar }) => {
  
  const initialState = [
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
  ];
  //Estados con Refs
  const nombrePlatillo = useRef("");
  const precioPlatillo = useRef("");

  //Estados normales
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState(false);
  const [categorias] = useState(initialState);

  //Funciones
  const editarProducto = async e => {
    e.preventDefault();

    //Validacion
    let nuevoNombre = nombrePlatillo.current.value,
      nuevoPrecio = precioPlatillo.current.value;

   //Revisar si cambio la categoria de lo contrario asiganr el mismo valor
   let categoriaPlatillo = categoria === "" ? producto.categoria : categoria;

    if (nuevoNombre === "" || nuevoPrecio === "" || categoriaPlatillo === "") {
      setError(true);
      return;
    }
    //Si todo esta bueno, ponemos en false el estado del error
    setError(false);    

    //Obtener los valores del formulario
    const editPlatillo = {
      nombrePlatillo: nuevoNombre,
      precioPlatillo: nuevoPrecio,
      categoria: categoriaPlatillo
    };

    //Enviar el Resquest
    const URL = `http://localhost:4000/restaurant/${producto.id}`;

    try {
      const resultado = await axios.put(URL, editPlatillo);

      if (resultado.status === 200) {
        Swal.fire(
          "Producto Editado",
          "El producto se edito correctamente",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
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


  useEffect(
    () => {
      const consultarAPI = async () => {
        //Consultar el API de json-server
        const URL = `http://localhost:4000/restaurant/${producto.id}`;
        const resultado = await axios.get(URL);
        console.log(resultado);      
        
      };
      consultarAPI();
    },[producto.id]
  )
  return (
    <div className="col-md-8 mx-auto">
      <h1 className="text-center">Editar el Producto</h1>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <form className="mt-5" onSubmit={editarProducto}>
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="Nombre Platillo"
            ref={nombrePlatillo}
            defaultValue={producto.nombrePlatillo}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            placeholder="Precio Platillo"
            ref={precioPlatillo}
            defaultValue={producto.precioPlatillo}
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
                defaultChecked={producto.categoria === categoria.value}
              />
              <label className="form-check-label">{categoria.value}</label>
            </div>
          ))}
        </div>
        <input
          type="submit"
          className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
          value="Editar Producto"
        />
      </form>
    </div>
  );
};

export default withRouter(EditarProductos);
