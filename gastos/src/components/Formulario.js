import React, { useState } from "react";
import shortid from "shortid";

import Error from "./Error";
const Formulario = props => {
  const { setGasto,setCrearGasto } = props;
  //State
  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidadGasto, setcantidadGasto] = useState("");
  const [error, setError] = useState(false);

  //Cuando se agrega el gasto
  const handleAgregarGasto = e => {
    e.preventDefault();

    //Validar
    if (cantidadGasto <= 0 || isNaN(cantidadGasto) || nombreGasto === "") {
      setError(true);
      return;
    }

    //Construir objeto de gasto
    const gasto = {
      nombreGasto,
      cantidadGasto,
      id: shortid.generate()
    };

    //Pasar el gasto al componente principal
    setGasto(gasto);
    setCrearGasto(true)

    //Eliminar alerta
    setError(false);

    //Reset Form
    setNombreGasto("");
    setcantidadGasto("");
  };
  return (
    <form onSubmit={handleAgregarGasto}>
      <h2>Agrega tus Gastos Aquí</h2>

      {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}

      <div className="campo">
        <label>Nombre del gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          onChange={e => setNombreGasto(e.target.value)}
          value={nombreGasto}
        />
      </div>
      <div className="campo">
        <label>Cantidad del gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          onChange={e => setcantidadGasto(parseInt(e.target.value, 10))}
          value={cantidadGasto}
        />
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gatos"
      />
    </form>
  );
};

export default Formulario;
