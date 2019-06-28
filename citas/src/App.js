import React, { useState, useEffect, Fragment } from "react";

const Formulario = ({ crearCita }) => {
  const initialState = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  };
  const [cita, setCita] = useState(initialState);

  const handleChange = e => {
    const { name, value } = e.target;
    e.preventDefault();
    setCita({
      ...cita,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    //Pasar la citas al componente padre
    crearCita(cita);

    //Reiniciar el state
    setCita(initialState);
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={handleChange}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={handleChange}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={handleChange}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleChange}
          value={cita.sintomas}
        />

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </Fragment>
  );
};

const Cita = ({ cita, index, eliminarCita }) => {
  return (
    <div className="cita">
      <p>
        Mascota: <span>{cita.mascota}</span>
      </p>
      <p>
        Propietario: <span>{cita.propietario}</span>
      </p>
      <p>
        Fecha: <span>{cita.fecha}</span>
      </p>
      <p>
        Hora: <span>{cita.hora}</span>
      </p>
      <p>
        Sintomas: <span>{cita.sintomas}</span>
      </p>
      <button
        className="button eliminar u-full-width"
        onClick={() => eliminarCita(index)}
      >
        Eliminar X
      </button>
    </div>
  );
};

function App() {
  //Cargar las ciats de localStorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, setCitas] = useState(citasIniciales);

  //Agregar nuevas citas al state
  const crearCita = cita => {
    //Tomamos una copia del state
    const nuevaCitas = [...citas, cita];
    setCitas(nuevaCitas);
    console.log(nuevaCitas);
  };

  //Elimina las citas del state
  const eliminarCita = index => {
    const nuevaCitas = [...citas];

    nuevaCitas.splice(index, 1);

    setCitas(nuevaCitas);
  };

  //Cargar Condicionalmente un Titulo
  const titulo =
    Object.keys(citas).length === 0 ? "No hay citas" : "Administrar las citas";

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  },[citas]);

  return (
    <Fragment>
      <h1>Adminitrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
