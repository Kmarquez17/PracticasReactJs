import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner";
import FichaSuscriptor from "../Suscriptores/FichaSuscriptor";

class PrestamoLibro extends Component {
  state = { busqueda: "", resultados: {}, noResultados: false };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleBusqueda = e => {
    e.preventDefault();

    //Obtener el valor a buscar
    const { busqueda } = this.state;

    //Extraer en firestore
    const { firestore } = this.props;

    //Hacer la consulta
    const colecion = firestore.collection("suscriptores");

    const consulta = colecion.where("codigo", "==", busqueda).get();

    //leer resultados
    consulta.then(resultados => {
      if (resultados.empty) {
        // no hay resultadosr
        this.setState({
          resultados: {},
          noResultados: true
        });
      } else {
        // si hay resultados
        const datos = resultados.docs[0];
        this.setState({
          resultados: datos.data(),
          noResultados: false
        });
      }
    });
  };

  /**Funcion para solicitar el prestamo de un libro */
  handleSolicitarPrestamo = () => {
    const suscriptor = this.state.resultados;

    //Fecha del alta
    suscriptor.fecha_solicitud = new Date().toLocaleDateString();

    //Obtener el Libro
    const libroActual = this.props.libro;

    //Agregar el susucriptor al libro
    libroActual.prestados.push(suscriptor);

    //Obtener  firestore y history de props
    const { firestore, history } = this.props;

    firestore
      .update(
        {
          collection: "libros",
          doc: libroActual.id
        },
        libroActual
      )
      .then(() => history.push("/"));
  };

  render() {
    //Obtener el libro
    const { libro } = this.props;
    //Estraer los datos del alumano
    const { resultados } = this.state;
    let fichaAlumno, btnSolicitud;

    if (!libro) return <Spinner />;

    if (resultados.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={resultados} />;
      btnSolicitud = (
        <button
          onClick={this.handleSolicitarPrestamo}
          className="btn btn-primary btn-block"
        >
          Solicitar Préstamo
        </button>
      );
    } else {
      fichaAlumno = null;
      btnSolicitud = null;
    }

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/"} className="btn btn-secondary ">
            <i className="fas fa-arrow-circle-left mr-1"></i>
            Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h3>
            <i className="fa fas-user-plus mr-1"></i>
            Solicitar Préstamo: {libro.titulo}
          </h3>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={this.handleBusqueda} className="mb-4">
                <legend className="color-primary text-center">
                  Busca el Suscriptor por Código
                </legend>
                <div className="form-group">
                  <input
                    type="text"
                    value={this.state.busqueda}
                    name="busqueda"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Buscar"
                  className="btn btn-success btn-block"
                />
              </form>
              {/* Muestra las fichas del alumno y el boton para solicitar del prestamo */}
              {fichaAlumno}
              {btnSolicitud}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);
