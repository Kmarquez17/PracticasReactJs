import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { borrarCitasAction, click1 } from "../actions/CitasActions";

const ListadoCitas = () => {
  //Obtener el estado de las citas
  const {citas}  = useSelector(state => state.citas);

  console.log(citas)

  //Dispatch
  const dispatch = useDispatch();
  //Mensaje Condicional
  const mensaje =
    Object.keys(citas).length === 0
      ? "No hay citas "
      : "Administrar citas aquí";

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title text-center">{mensaje}</h2>
        <div className="lista-citas">
          {citas.map(cita => (
            <div className="media mt-3" key={cita.id}>
              <div className="media-body">
                <h3 className="mt-0">{cita.mascota}</h3>
                <p className="card-text">
                  <span>Nombre Dueño</span> {cita.propetario}
                </p>
                <p className="card-text">
                  <span>Fecha</span> {cita.fecha}
                </p>
                <p className="card-text">
                  <span>Hora</span> {cita.hora}{" "}
                </p>
                <p className="card-text">
                  <span>Sintomas</span> {cita.sintomas} <br />{" "}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={e => {
                    e.preventDefault();
                    console.log(cita.id);
                    dispatch(borrarCitasAction(cita.id));
                  }}
                >
                  Borrar &times;
                </button>

                <button
                  className="btn btn-danger"
                  onClick={e => {
                    e.preventDefault();
                    dispatch(click1(1));
                  }}
                >
                  Click Hola &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListadoCitas;
