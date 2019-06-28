import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from 'prop-types';

const stateInicial = {
    cita: {
      mascota: "",
      propetario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    },
    error: false
  };

class NuevaCita extends Component {
 
    state = {...stateInicial}
  /*Cuando el usuario escribe en los input */
  handleChange = e => {
    e.preventDefault();
    //Colocar lo que el usuario escribe en el state
    this.setState({
      cita: {
        ...this.state.cita,
        [e.target.name]: e.target.value
      }
    });
  };

  /*Cuando el usuario envia el formulario */
  handleSubmit = e => {
    e.preventDefault();
    // extraer los valores del state
    const { mascota, propetario, fecha, hora, sintomas } = this.state.cita;

    //validar que todos los campos esten llenos

    if (mascota === "" ||propetario === "" ||fecha === "" ||hora === "" ||sintomas === "") {
      this.setState({ error: true });
      return;
    } 

    //Generar un objeto con los datos
    const nuevaCita = { ...this.state.cita };
    nuevaCita.id = uuid();

    //Agregar la cita al state de App
    this.props.crearNuevaCita(nuevaCita);

    //Colocar en el state el stateInicial
    this.setState({...stateInicial})

  };

  render() {
    const { error } = this.state;

    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">
            Llena el formulario para crear una nueva cita
          </h2>

          {error ? (
            <div className="alert alert-danger mt-2 mb-5 text-center">
              Todos los campos son obligatorios
            </div>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Mascota
              </label>

              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>
            {/*form-group*/}
            {/* ****************************************************** */}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Dueño
              </label>

              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Dueño Mascota"
                  name="propetario"
                  onChange={this.handleChange}
                  value={this.state.cita.propetario}
                />
              </div>
            </div>
            {/*form-group*/}
            {/* ****************************************************** */}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>

              <div className="col-sm-8 col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>

              <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>

              <div className="col-sm-8 col-lg-4">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>
            {/*form-group*/}
            {/* ****************************************************** */}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Sintomas
              </label>

              <div className="col-sm-8 col-lg-10">
                <textarea
                  className="form-control"
                  name="sintomas"
                  placeholder="Describre los Sintomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                />
              </div>
            </div>
            {/*form-group*/}

            <input
              type="submit"
              className="py-3 mt-2 btn btn-success btn-block"
              value="Agregar Nueva cita"
            />
          </form>
        </div>
      </div>
    );
  }
}

NuevaCita.propTypes = { 
    crearNuevaCita : PropTypes.func.isRequired
}

export default NuevaCita;
