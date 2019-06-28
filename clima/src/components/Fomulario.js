import React, { useState } from "react";

const Formulario = ({ datosConsulta }) => {
  const initalState = [
    { id: 1, nombre: "Estados Unidos", ciudad: "US" },
    { id: 2, nombre: "España", ciudad: "ES" },
    { id: 3, nombre: "Argentina", ciudad: "AR" },
    { id: 4, nombre: "Nicaragua", ciudad: "NI" },
    { id: 5, nombre: "México", ciudad: "MX" },
    { id: 6, nombre: "Colombia", ciudad: "CO" },
    { id: 7, nombre: "Costa Rica", ciudad: "CR" }
  ];

  //State del componente
  //busqueda equivale a state
  //setBusqueda equivale a setState({})
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: ""
  });

  const [pais] = useState(initalState);

  const handleChange = e => {
    //Cambiamos el state
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  const consultarClima = e => {
    e.preventDefault();
    //Pasar hacia el componente principal de la busquedas
    datosConsulta(busqueda);
  };

  return (
    <form onSubmit={consultarClima}>
      <div className="inpunt-field col s12">
        <input type="text" name="ciudad" id="ciudad" onChange={handleChange} />
        <label htmlFor="ciudad" />
      </div>

      <div className="input-field col s12">
        <select onChange={handleChange} name="pais">
          <option value="">Selecciona un país </option>
          {pais.map(ciudad => (
            <option key={ciudad.id} value={ciudad.ciudad}>
              {ciudad.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4"
          value="Buscar Clima"
        />
      </div>
    </form>
  );
};

export default Formulario;
