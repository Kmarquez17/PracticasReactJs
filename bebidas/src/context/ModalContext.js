import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const ModalContext = createContext();

const ModalProvider = props => {
  //State del provider
  const [id, setId] = useState(null);
  const [detalle, setDetalle] = useState({});

  useEffect(() => {
    const obtenerDetalleReceta = async () => {
      if (!id) return null;
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const detalleReceta = await Axios.get(url);
      setDetalle(detalleReceta.data.drinks[0]);
    };

    obtenerDetalleReceta();
  }, [id]);

  return (
    <ModalContext.Provider
      value={{
        detalle,
        setId,
        setDetalle
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
