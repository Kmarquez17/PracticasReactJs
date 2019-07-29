import React from "react";

const Listado = ({ gastos }) => {
  return (
    <div className="gastos-realizados">
      <h2>Listado</h2>
      {gastos.map(gasto => (
        <li key={gasto.id} className="gastos">
          <p>
            {gasto.nombreGasto}
            <span className="gasto">$ {gasto.cantidadGasto}</span>
          </p>
        </li>
      ))}
    </div>
  );
};

export default Listado;
