import axios from "axios";
import React, { useEffect, useState } from "react";
import Cryptomonedas from "./Cryptomonedas";
import Error from './Error'

const Fomulario = ({setMoneda, setCryptomoneda}) => {
  //Estados
  const [monedas, setMonedas] = useState([]);
  const [cryptomonedas, setCryptomonedas] = useState([]);
  const [monedasCotizar, setMonedasCotizar] = useState("");
  const [cryptoCotizar, setCryptoCotizar] = useState("");
  const [error, setError] = useState(false);

  //Funciones
  const cargandoMonedas = () => {
    setMonedas([
      {
        id: "1",
        name: "Dolar Estado Unidense",
        value: "USD"
      },
      {
        id: "2",
        name: "Peso Mexicano",
        value: "MXN"
      },
      {
        id: "3",
        name: "Libra",
        value: "GBP"
      },
      {
        id: "4",
        name: "Euro",
        value: "EUR"
      }
    ]);
  };

  const consultarAPI = async () => {
    const URL = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD`;
    const result = await axios.get(URL);
    setCryptomonedas(result.data.Data);
  };

  useEffect(() => {
    cargandoMonedas();
    consultarAPI();
  }, []);

  const cotizarModena = (e) => {
    e.preventDefault();

    //Validar si ambos campos estan llenos
      if(monedasCotizar === '' || cryptoCotizar===''){       
        setError(true) 
        return
      }else{
        setError(false)
      }
    //Pasar los datos al componente principal
    setMoneda(monedasCotizar)
    setCryptomoneda(cryptoCotizar)
  }

  //Mostrar el error en caso que los datos seleccionados venga vacios
  const componente = (error) ? <Error mensaje='Ambos campos son obligatorio...!' /> :null

  return (
    <form onSubmit={cotizarModena}>
      {componente}
      <div className="row">
        <label>Elige tu moneda</label>
        <select
          onChange={e => setMonedasCotizar(e.target.value)}
          className="u-full-width"
        >
          <option value="">Elige tu moneda</option>
          {monedas.map(moneda => (
            <option key={moneda.id} value={moneda.value}>
              {moneda.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <label>Elige tu Cryptomoneda</label>
        <select
          onChange={e => setCryptoCotizar(e.target.value)}
          className="u-full-width"
        >
          <option value="">Elige tu Cryptomoneda</option>
          {cryptomonedas.map(crypto => (
            <Cryptomonedas key={crypto.CoinInfo.Id} cryptomonedas={crypto} />
          ))}
        </select>
      </div>
      <input type="submit" value="Calcular" className="button-primary u-full-width"/>
    </form>
  );
};

export default Fomulario;
