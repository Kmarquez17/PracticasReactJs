import React, { useState } from "react";
import Error from "./Error";

const Buscador = ({setTraerBusqueda}) => {
  //Estados
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(false);

  //Funciones
  const buscarImagen = e => {
    e.preventDefault();

    //Validar
    if (busqueda === "") {
      setError(true);
      return;
    }
    //Enviar Termino
    setError(false);
    setTraerBusqueda(busqueda)
  };

  return (
    <form onSubmit={buscarImagen}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: Fútbol o Café"
            onChange={e => {
              setBusqueda(e.target.value);
            }}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="Agrega un término de búsqueda" /> : null}
    </form>
  );
};

export default Buscador;
