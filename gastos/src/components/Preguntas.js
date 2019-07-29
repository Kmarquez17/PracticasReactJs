import React, { Fragment, useState } from "react";

import Error from "./Error";

const Preguntas = props => {
  const { setPresupuesto, setPreguntaPres, setRestante } = props;
  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState(false);

  const handleAgregarPres = e => {
    e.preventDefault();

    //Validar
    if (cantidad <= 0 || isNaN(cantidad)) {
      setError(true);
      return;
    }

    //Si se pasa la validación
    setError(false);
    setPresupuesto(cantidad);
    setRestante(cantidad);
    setPreguntaPres(false);
  };
  return (
    <Fragment>
      <h2>Coloca tu Presupuesto </h2>

      {error ? <Error mensaje="El presupuesto es incorrecto" /> : null}

      <form onSubmit={handleAgregarPres}>
        <input
          type="number"
          className="u-full-width"
          placeholder="Agrega un Presupuesto"
          onChange={e => setCantidad(parseInt(e.target.value))}
        />
        <input
          type="submit"
          className="button-primary u-full-width"
          value="Definir Presupuesto"
        />
      </form>
    </Fragment>
  );
};

export default Preguntas;
