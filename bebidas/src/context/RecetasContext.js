import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = props => {
  const [recetas, setRecetas] = useState([]);
  const [consultar, setConsultar] = useState(false);

  const [busqueda, setBuscarRecetas] = useState({
    nombre: "",
    categoria: ""
  });

  useEffect(() => {
    const ObtenerRecetas = async () => {
      let { nombre, categoria } = busqueda;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&?c=${categoria}`;
      const recetas = await Axios.get(url);

      setRecetas(recetas.data.drinks);
    };

    if (consultar) {
      ObtenerRecetas();
      setConsultar(false);
    }
  }, [busqueda, consultar]);
  return (
    <RecetasContext.Provider
      value={{
        setBuscarRecetas,
        setConsultar,
        recetas
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
