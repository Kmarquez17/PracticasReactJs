import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = { usarioAuth: false };
  //recibe los props automaticamente
  static getDerivedStateFromProps(nextProps, prevState) {
    const { auth } = nextProps;
    if (auth.uid) {
      return { usarioAuth: true };
    } else {
      return { usarioAuth: false };
    }
  }

  /**Cerrar sesion */
  handleCerrarSesion = () => {
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { usarioAuth } = this.state;
    const { auth } = this.props;
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
          <nav href="/" className="navbar navbar-light">
            <span className="navbar-brand mb-0 h1">
              Administrador de Biblioteca
            </span>
          </nav>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            {usarioAuth ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Libros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/suscriptores"} className="nav-link">
                    Suscriptores
                  </Link>
                </li>
              </ul>
            ) : null}
            {usarioAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="!#" className="nav-link">
                    {auth.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.handleCerrarSesion}
                  >
                    Cerrar Sesion
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </nav>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
