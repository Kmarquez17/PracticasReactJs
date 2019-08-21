import React, { useState, useEffect } from "react";
import Buscador from "./components/Buscador";
import ListadoImagenes from "./components/ListadoImagenes";
function App() {
  //Estados
  const [traerBusqueda, setTraerBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginActual] = useState(1);
  const [totalPagina, setTotalPagina] = useState(1);
  const [copiaBusqueda, setCopiaBusqueda] = useState("");

  //Funciones
  const paginaAnterior = () => {
    setPaginActual(paginaActual - 1);
  };
  const paginaSiguiente = () => {
    setPaginActual(paginaActual + 1);
  };
  /*
    El useEffect es la combinacion del componentWillMount y componentDidMount
    useEffect(
      funcion(){},
      [estados ocupados en el useEffect] nota: si cambian algunos de ellos se ejecuta de nuevo el useEffect
    )

    ejemplo
    useEffect(
      () => {
        console.log(contando)
      }, [contador]
    )
    si contador cambia en cualquier parte del codigo, automaticamente se imprime en consola la palabra 'contando'
  */

  useEffect(() => {
    console.log(1);
    //Hacemos una copia para saber si la busqueda cambio y inicializar nuestra pagina
    if (traerBusqueda !== copiaBusqueda) {
      setPaginActual(1);
    }
    //Funcion del API
    const consultarAPI = async () => {
      //Maximo de imagenes
      const imagenesPorPagina = 30;

      //Key del API
      const key = "13285460-cf7293df2aefce974c2d89e2d";

      //URL de la API con la busqueda ya obtenida
      const URL = `https://pixabay.com/api/?key=${key}&q=${traerBusqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      //Respuesta de la API con su URL
      const respuesta = await fetch(URL);

      //Resultado final, promesa resuelta
      const resultado = await respuesta.json();

      //Guardamos lo obtenido en el estado
      setImagenes(resultado.hits);

      //Calculando paginado mediante el total de imagenes
      setTotalPagina(Math.ceil(resultado.totalHits / imagenesPorPagina));

      //Llevar al usuario a la parte superior
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (traerBusqueda === "") {
      return;
    }
    consultarAPI();
    setCopiaBusqueda(traerBusqueda);
  }, [traerBusqueda, paginaActual, copiaBusqueda]);
  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Buscador setTraerBusqueda={setTraerBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {paginaActual === 1 ? null : (
          <button onClick={paginaAnterior} className="btn btn-info mr-1">
            &laquo; Anterior
          </button>
        )}

        {paginaActual === totalPagina ? null : (
          <button onClick={paginaSiguiente} className="btn btn-info ">
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
