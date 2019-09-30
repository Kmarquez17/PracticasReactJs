import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//Componentes
import Spinner from "../Layout/Spinner";
const MostrarSuscriptor = ({ suscriptor }) => {
  if (!suscriptor) return <Spinner />;
  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <Link to={"/suscriptores"} className="btn btn-secondary ">
          <i className="fas fa-arrow-circle-left mr-1"></i>
          Volver al listado
        </Link>
      </div>

      <div className="col-md-6">
        <Link
          to={`/suscriptores/editar/${suscriptor.id}`}
          className="btn btn-primary float-right"
        >
          <i className="fas fa-pencil-alt mr-1"></i>
          Editar Suscriptor
        </Link>
      </div>
      <hr className="w-100 mx-5" />

      <div className="col-12">
        <h3 className="mb-4">
          {suscriptor.nombre} {suscriptor.apellido}
        </h3>
        <p>
          <span className="font-weight-bold">Carrera: </span>
          {suscriptor.carrera}
        </p>
        <p>
          <span className="font-weight-bold">Código: </span>
          {suscriptor.codigo}
        </p>
      </div>
    </div>
  );
};

MostrarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(MostrarSuscriptor);
