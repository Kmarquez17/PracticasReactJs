import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Componentes
import Spinner from "../Layout/Spinner";

const Suscriptores = ({ suscriptores, firestore }) => {
  if (!suscriptores) return <Spinner />;
  //   console.log(firestore)

  /**Eliminar suscriptores */
  const handleEliminarSuscriptores = id => {
    firestore.delete({
      collection: "suscriptores",
      doc: id
    });
    // .then(() => {history.push('/suscriptores')})
  };
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to={`/suscriptores/nuevo`} className="btn btn-primary">
          <i className="fas fa-plus mr-1"></i>
          Nuevo
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users"></i>Suscriptores
        </h2>
      </div>

      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map((suscriptor, index) => (
            <tr key={suscriptor.id}>
              <td>
                {suscriptor.nombre} {suscriptor.apellido}
              </td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${suscriptor.id}`}
                  className="btn btn-success mr-3"
                >
                  <i className="fas fa-angle-double-right mr-1"></i>
                  Más información
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleEliminarSuscriptores(suscriptor.id);
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

Suscriptores.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "suscriptores" }]),
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
