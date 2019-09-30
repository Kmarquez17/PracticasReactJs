import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner";

const Libros = ({ libros, firestore }) => {
  if (!libros) return <Spinner />;

  /**Funcion para eliminar libros */
  const handleEliminarLibros = id => {
    firestore.delete({
      collection: "libros",
      doc: id
    });
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/libros/nuevo" className="btn btn-primary">
          <i className="fas fa-plus mr-1"></i>
          Nuevo Libro
        </Link>
      </div>
      <div className="col-md-8">
        <h3>
          <i className="fas fa-book mr-1"></i>
          Libros
        </h3>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Titulo</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Existencia</th>
            <th>Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.ISBN}</td>
              <td>{libro.editorial}</td>
              <td>{libro.existencia}</td>
              <td>{libro.existencia - libro.prestados.length}</td>
              <td>
                <Link
                  to={`/libros/mostrar/${libro.id}`}
                  className="btn btn-success mr-3"
                >
                  <i className="fas fa-angle-double-right mr-1"></i>
                  Más información
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleEliminarLibros(libro.id);
                  }}
                >
                  <i className="fas fa-trash-alt mr-1"></i>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Libros.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "libros" }]),
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  }))
)(Libros);
