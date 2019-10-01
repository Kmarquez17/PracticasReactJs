import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Componentes
import Spinner from "../Layout/Spinner";
const MostrarLibro = ({ libro, firestore }) => {
  
  const handleDevolverLibro = codigo => {
    //Copia del libro
    const libroActualizado = { ...libro };

    //Eliminar la persona que esta realizadon la devoluacion del libro prestado
    const prestados = libro.prestados.filter(
      elemento => elemento.codigo !== codigo
    );

    //Se le asiga de nuevo los alumnos que prestaron, pero quitando el alumno que devolvio el libro
    libroActualizado.prestados = prestados;

    //Actualizar en firestore
    firestore.update(
      {
        collection: "libros",
        doc: libroActualizado.id
      },
      libroActualizado
    );
  };
  //Boton para solicitar un libro
  let btnPrestamo;

  //Validar el libro a consultar
  if (!libro) return <Spinner />;

  btnPrestamo =
    libro.existencia - libro.prestados.length > 0 ? (
      <Link
        to={`/libros/prestamo/${libro.id}`}
        className="btn btn-success my-2"
      >
        Solicitar Préstamo
      </Link>
    ) : null;

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <Link to="/" className="btn btn-secondary">
          <i className="fas fa-arrow-circle-left mr-1"></i>
          Volver al listado
        </Link>
      </div>
      <div className="col-md-6">
        <Link
          to={`/libros/editar/${libro.id}`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-pencil-alt mr-1"></i>
          Editar Libro
        </Link>
      </div>
      <hr className="w-100 mx-5" />
      <div className="col-12">
        <h3 className="mb-4">{libro.titulo}</h3>
        <p>
          <span className="font-weight-bold">ISBN: </span>
          {libro.ISBN}
        </p>
        <p>
          <span className="font-weight-bold">Editorial: </span>
          {libro.editorial}
        </p>
        <p>
          <span className="font-weight-bold">Existencia: </span>
          {libro.existencia}
        </p>
        <p>
          <span className="font-weight-bold">Disponibles: </span>
          {libro.existencia - libro.prestados.length}
        </p>
        {/* Boton para prestar libros */}
        {btnPrestamo}

        {/* Muestra las personas que tienen los libros */}
        <React.Fragment>
          <h3 className="my-3">Personas que tienen prestado el libro</h3>
          {libro.prestados.map(prestado => (
            <div key={prestado.codigo} className="card my-2">
              <h4 className="card-header">
                {prestado.nombre} {prestado.apellido}
              </h4>
              <div className="card-body">
                <p>
                  <span className="font-weight-bold">Carrera: </span>
                  {prestado.carrera}
                </p>

                <p>
                  <span className="font-weight-bold">Código: </span>
                  {prestado.codigo}
                </p>

                <p>
                  <span className="font-weight-bold">Fecha de Solicitud: </span>
                  {prestado.fecha_solicitud}
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger font-weight-bold"
                  onClick={() => {
                    handleDevolverLibro(prestado.codigo);
                  }}
                >
                  Realizar Devolución
                </button>
              </div>
            </div>
          ))}
        </React.Fragment>
      </div>
    </div>
  );
};

MostrarLibro.propTypes = {
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
)(MostrarLibro);
