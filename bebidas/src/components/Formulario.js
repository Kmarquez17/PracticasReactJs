import React, { useContext, useState } from "react";
import { CategoriasContext } from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: ""
  });

  //Funcion para leer datos
  const obtenerDatosRecetas = e => {
    e.preventDefault();
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const { categorias } = useContext(CategoriasContext);
  const { setBuscarRecetas, setConsultar } = useContext(RecetasContext);

  return (
    <form
      className="col-12"
      onSubmit={e => {
        e.preventDefault();
        setBuscarRecetas(busqueda);
        setConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend>Busca bebidas por Categorias e Ingredientes</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Ingredientes"
            name="nombre"
            onChange={obtenerDatosRecetas}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatosRecetas}
          >
            <option value="">--Selecciona Categoria--</option>
            {categorias.map((categoria, key) => (
              <option key={key} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            value="Buscar Bebidas"
            className="btn btn-block btn-primary"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
