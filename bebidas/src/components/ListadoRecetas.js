import React, { useContext, useState } from "react";
import { RecetasContext } from "../context/RecetasContext";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.default,
    border: "2px solid #000",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3)
  }
}));

const ListadoRecetas = () => {
  //Extraer las recetas
  const { recetas } = useContext(RecetasContext);
  const { setId, detalle, setDetalle } = useContext(ModalContext);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mostrarIngredientes = detalle => {
    let ingredientes = [];

    for (let i = 0; i < 16; i++) {
      if (detalle[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={i}>
            {detalle[`strIngredient${i}`]} {detalle[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };
  return (
    <div className="row mt-5">
      {recetas.map(receta => {
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
                <button
                  type="button"
                  className="btn btn-block btn-primary"
                  onClick={() => {
                    setId(idDrink);
                    handleOpen();
                  }}
                >
                  Ver Receta
                </button>

                <Modal
                  open={open}
                  onClose={() => {
                    setId(null);
                    setDetalle({});
                    handleClose();
                  }}
                >
                  <div style={modalStyle} className={classes.paper}>
                    <h2>{detalle.strDrink}</h2>
                    <h3 className="mt-4">Intrucciones</h3>
                    <p>{detalle.strInstructions}</p>

                    <img
                      src={detalle.strDrinkThumb}
                      className="img-fluid my-4"
                      alt={detalle.strDrink}
                    />

                    <h3 className="mt-4">Imgrendientes y Cantidades</h3>
                    <ul>{mostrarIngredientes(detalle)}</ul>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListadoRecetas;
