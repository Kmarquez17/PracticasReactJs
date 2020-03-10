import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

//Crear el Context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y state

const CategoriasProvider = props => {
  //Crear el state del context
  const [categorias, setCategorias] = useState([]);

  //Ejecutar el llamado al api
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
      const categorias = await Axios.get(url);

      setCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider
      value={{
        categorias
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
