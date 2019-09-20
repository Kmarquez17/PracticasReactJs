import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "uuid/v4";

import { agregarCitasAction } from "../actions/CitasActions";
import { validarFormulario } from "../actions/ErrorActions";
const AgregarCitas = () => {
  // state  del componente
  const [mascota, setMascota] = useState("");
  const [propetario, setPropetario] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [sintomas, setSintomas] = useState("");

  //Dispacth para ejecutar nuestras acciones
  const dispatch = useDispatch();

  const agregarNuevaCita = cita => {
    dispatch(agregarCitasAction(cita));
  };

  //useSelector es similar a mapStateToProps en Hooks
  const { error } = useSelector(state => state.error);
  //Enviar citas
  const handleNuevaCita = e => {
    e.preventDefault();

    //Validar el formulario
    if (
      mascota.trim() === "" ||
      propetario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      dispatch(validarFormulario(true));
      return;
    }

    // Crear la nueva cita y Almacenar en el state
    agregarNuevaCita({
      id: uuid(),
      mascota,
      propetario,
      fecha,
      hora,
      sintomas
    });
    dispatch(validarFormulario(false));

    // Reiniciar el formulario
    setMascota("");
    setPropetario("");
    setFecha("");
    setHora("");
    setSintomas("");
  };

  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title text-center mb-5">Agrega las citas aqui</h2>
        <form onSubmit={handleNuevaCita}>
          <div className="form-group row">
            <label className="col-sm-4 col-lg-2 col-form-label">
              Nombre Mascota
            </label>
            <div className="col-sm-8 col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Mascota"
                value={mascota}
                onChange={e => {
                  setMascota(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-lg-2 col-form-label">
              Nombre Dueño
            </label>
            <div className="col-sm-8 col-lg-10">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre Dueño de la Mascota"
                value={propetario}
                onChange={e => {
                  setPropetario(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
            <div className="col-sm-8 col-lg-4  mb-4 mb-lg-0">
              <input
                type="date"
                className="form-control"
                value={fecha}
                onChange={e => {
                  setFecha(e.target.value);
                }}
              />
            </div>

            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
            <div className="col-sm-8 col-lg-4">
              <input
                type="time"
                className="form-control"
                value={hora}
                onChange={e => {
                  setHora(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
            <div className="col-sm-8 col-lg-10">
              <textarea
                className="form-control"
                value={sintomas}
                onChange={e => {
                  setSintomas(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="form-group row justify-content-end">
            <div className="col-sm-3">
              <button type="submit" className="btn btn-success w-100">
                Agregar
              </button>
            </div>
          </div>
        </form>
        {error ? (
          <div className="alert-danger text-center p2">
            Todos los cambios son obligatorios
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AgregarCitas;
