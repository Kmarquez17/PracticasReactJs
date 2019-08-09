import React, { useState, useEffect } from "react";
import Imagen from "./cryptomonedas.png";
import Formulario from "./Components/Formularios";
import Spinner from "./Components/Spinner";
import Cotizacion from "./Components/Cotizacion";
import axios from "axios";

function App() {
  const [moneda, setMoneda] = useState("");
  const [cryptomoneda, setCryptomoneda] = useState("");
  const [carga, setCarga] = useState(false);
  const [result, SetResult] = useState({});

  useEffect(() => {
    const cotizarCryptomonedas = async () => {
      debugger;
      //Si no hay data
      if (moneda === "" || cryptomoneda === "") {
        return;
      }
      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
      const result = await axios.get(URL);

      //Mostramos el spinner
      setCarga(true);

      setTimeout(() => {
        SetResult(result.data.DISPLAY[cryptomoneda][moneda]);
        setCarga(false);
      }, 3000);
    };
    cotizarCryptomonedas();
  }, [cryptomoneda, moneda]);

  //Mostrar spinner o resultado
  const Componente = carga ? <Spinner /> : <Cotizacion resultado={result} />;

  console.log(carga);

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={Imagen} alt="Logo Cryptomonedas" className="logotipo" />
        </div>
        <div className="one-half column">
          <h1>Cotiza Cryptomonedas al Instante</h1>
          <Formulario setMoneda={setMoneda} setCryptomoneda={setCryptomoneda} />
          {Componente}
        </div>
      </div>
    </div>
  );
}

export default App;
