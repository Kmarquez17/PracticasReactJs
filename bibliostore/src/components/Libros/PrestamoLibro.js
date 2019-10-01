import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner";
import FichaSuscriptor from "../Suscriptores/FichaSuscriptor";

//Redux Actions
import { buscarUsuario } from "../../actions/buscarUsuarioActions";
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
    const { firestore, buscarUsuario } = this.props;

    //Hacer la consulta
    const colecion = firestore.collection("suscriptores");

    const consulta = colecion.where("codigo", "==", busqueda).get();

    //leer resultados
    consulta.then(resultados => {
      if (resultados.empty) {
        // no hay resultados

        //almacenar en redux un objeto vacio
        buscarUsuario({});

        //actualiza el state en base a si hay resultados
        this.setState({
          noResultados: true
        });
      } else {
        // si hay resultados
        //colocar el resultad en el state de redux
        const datos = resultados.docs[0];
        buscarUsuario(datos.data());

        //actualiza el state en base a si hay resultados
        this.setState({
          noResultados: false
        });
      }
    });
  };

  /**Funcion para solicitar el prestamo de un libro */
  handleSolicitarPrestamo = () => {
    const { usuario } = this.props;

    //Fecha del alta
    usuario.fecha_solicitud = new Date().toLocaleDateString();

    //No se pueden mutar los props, tomar una copia del array de prestados
    //y agregar el nuevo suscriptor de prestamo

    let prestados = [];
    prestados = [...this.props.libro.prestados, usuario];

    console.log(prestados);

    //Copiar el objeto y agregar los prestados
    const libro = { ...this.props.libro };

    console.log(libro);

    //Eliminar los prestados anteriores
    delete libro.prestados;

    //Asigar los prestados
    libro.prestados = prestados;
    console.log(libro);

    //Obtener  firestore y history de props
    const { firestore, history } = this.props;
    // return;
    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        libro
      )
      .then(() => history.push("/"));
  };

  render() {
    //Obtener el libro y el suscripor consultado(usuario)
    const { libro, usuario } = this.props;

    //Mostrar de mensaje si el codigo del suscriptor no existe

    let fichaAlumno, btnSolicitud, msj;

    if (!libro) return <Spinner />;

    if (usuario.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={usuario} />;
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

    msj = this.state.noResultados ? (
      <div className="alert alert-danger text-center">No existe suscriptor</div>
    ) : null;

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
              {msj}
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
  connect(
    ({ firestore: { ordered }, usuario }, props) => ({
      libro: ordered.libro && ordered.libro[0],
      usuario: usuario
    }),
    { buscarUsuario }
  )
)(PrestamoLibro);
