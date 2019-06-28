import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Fomulario";
import Error from "./components/Error";
import Clima from "./components/Clima";

function App() {
  // const AppId = '7cd29710531e79b7750657a2efe9a383';
  // let URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${AppId}`;

  //State Principal

  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [error, setError] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(
    () => {
      //prevenir ejecucion cuando el API requiera valores
      if (ciudad === "") {
        return;
      } else {
        //Consultar API
        const consultarAPI = async () => {
          const AppId = "7cd29710531e79b7750657a2efe9a383";

          let URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${AppId}`;

          const respuesta = await fetch(URL);
          const resultado = await respuesta.json();
          setResultado(resultado);

          console.log(resultado);
        };
        consultarAPI();
      }
    },
    [
      ciudad,
      pais
    ] /**Aqui reacciona depenciendo el valor cambiado, y esta dentro del arreglo */
  );

  const datosConsulta = datos => {
    //Validar que ambos esten llenos
    console.log(datos);
    if (datos.ciudad === "" || datos.pais === "") {
      setError(true);
      return;
    }

    //Ciudad y pais existen, agregarlos al state
    setCiudad(datos.ciudad);
    setPais(datos.pais);
    setError(false);
  };

  // Cargar un componente condicionalmente
  let componente = null;
  if (error) {
    //Hay un error mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe en el API" />;
  } else {
    //Mostrar el Clima
    componente = <Clima resultado={resultado} />;
  }
  return (
    <div className="App">
      <Header titulo="React Clima App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
