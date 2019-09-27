import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
class NuevoSuscriptor extends Component {
  state = {
    nombre: "",
    apellido: "",
    carrera: "",
    codigo: ""
  };

  /**Funcion para capturar los valores del formulario y asinarlo al state */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**Funcion para guardar un suscriptor */
  handleAgregar = e => {
    e.preventDefault();

    //extraer los valores del state
    const nuevoSusucriptor = this.state;

    //extraer firestore de los props
    const { firestore, history } = this.props;

    //guardarlo en la base de datos
    firestore
      .add(
        {
          collection: "suscriptores"
        },
        nuevoSusucriptor
      )
      .then(() => {
        history.push("/suscriptores");
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/suscriptores"} className="btn btn-secondary ">
            <i className="fas fa-arrow-circle-left mr-1"></i>
            Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h3>
            <i className="fa fas-user-plus mr-1"></i>
            Nuevo Suscriptor
          </h3>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.handleAgregar}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre del suscriptor"
                    required
                    onChange={this.handleChange}
                    value={this.state.nombre}
                  />
                </div>

                <div className="form-group">
                  <label>Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del suscriptor"
                    required
                    onChange={this.handleChange}
                    value={this.state.apellido}
                  />
                </div>

                <div className="form-group">
                  <label>Carrera:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del suscriptor"
                    required
                    onChange={this.handleChange}
                    value={this.state.carrera}
                  />
                </div>

                <div className="form-group">
                  <label>Código:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="codigo"
                    placeholder="Código del suscriptor"
                    required
                    onChange={this.handleChange}
                    value={this.state.codigo}
                  />
                </div>
                <input
                  type="submit"
                  value="Agregar Suscriptor"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NuevoSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoSuscriptor);
