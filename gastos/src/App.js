import React, { useState, useEffect } from "react";

import Preguntas from "./components/Preguntas";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import ControlPresupuesto from "./components/ControlPresupuesto";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [preguntaPres, setPreguntaPres] = useState(true);
  const [crearGasto, setCrearGasto] = useState(false);
  const [gasto, setGasto] = useState({});
  const [gastos, setGastos] = useState([]);

  const [restante, setRestante] = useState(0);

  useEffect(() => {
    if (crearGasto) {
      const listadoGastos = [...gastos, gasto];
      setGastos(listadoGastos);
      setCrearGasto(false);

      //restar presupuesto
      const presupuestoRes = restante - gasto.cantidadGasto;
      setRestante(presupuestoRes);
    }
  }, [crearGasto]);

  return (
    <div className="app container">
      <header>
        <h1>Gastos Semanal</h1>
        <div className="contenido-principal contenido">
          {preguntaPres ? (
            <Preguntas
              setPresupuesto={setPresupuesto}
              setPreguntaPres={setPreguntaPres}
              setRestante={setRestante}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario setGasto={setGasto} setCrearGasto={setCrearGasto} />
              </div>
              <div className="one-half column">
                <Listado gastos={gastos} />
                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
