import React, { useContext } from "react";
import { RecetasContext } from "../context/RecetasContext";

const ListadoRecetas = () => {
  //Extraer las recetas
  const { recetas } = useContext(RecetasContext);
  return (
    <div className="row mt-5">
      {recetas.map(receta => {
        console.log(receta);
        const { strDrink, strDrinkThumb, idDrink } = receta;
        return (
          <div className="col-md-4 mb-3" key={idDrink}>
            <div className="card">
              <h2 className="card-header">{strDrink}</h2>
              <img
                src={strDrinkThumb}
                alt={strDrink}
                className="card-img-top"
              />
              <div className="card-body">
                <button type="button" className="btn btn-block btn-primary">
                  Ver Receta
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListadoRecetas;
