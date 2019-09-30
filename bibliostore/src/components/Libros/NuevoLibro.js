import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class NuevoLibro extends Component {
  state = {
    titulo: "",
    ISBN: "",
    editorial: "",
    existencia: "",
    prestados:[]
  };
  /**Funcion para capturar los valores del formulario y asignarlo al state */
  handleChage = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAgregarLibro = e => {
    e.preventDefault();
    //extraer los valores del state
    const nuevoLibro = this.state;

    //extraer firestore de los props
    const { firestore, history } = this.props;

    //guardarlo en la base de datos
    firestore
      .add(
        {
          collection: "libros"
        },
        nuevoLibro
      )
      .then(() => {
        history.push("/");
      });
  };
  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-1"></i>
            Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h3>
            <i className="fas-fa-book"></i>
            Nuevo Libro
          </h3>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.handleAgregarLibro}>
                <div className="form-group">
                  <label>Titulo:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo del libro"
                    required
                    value={this.state.titulo}
                    onChange={this.handleChage}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del libro"
                    required
                    value={this.state.ISBN}
                    onChange={this.handleChage}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del libro"
                    required
                    value={this.state.editorial}
                    onChange={this.handleChage}
                  />
                </div>

                <div className="form-group">
                  <label>Existencia: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="existencia"
                    placeholder="Existencia del libro"
                    required
                    value={this.state.existencia}
                    onChange={this.handleChage}
                  />
                </div>

                <input
                  type="submit"
                  value="Agregar Libro"
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

NuevoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoLibro);
