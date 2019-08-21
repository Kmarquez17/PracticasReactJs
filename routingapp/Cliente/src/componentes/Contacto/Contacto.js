import React, { Component, Fragment } from "react";
import "./Contacto.css";

class Contacto extends Component {
  login = () => {
    this.props.auth.login();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Fragment>
        {isAuthenticated() ? (
          <form>
            <legend>Formulario de Contacto</legend>
            <div className="input-field">
              <label>Nombre: </label>
              <input type="text" placeholder="Tu Nombre" />
            </div>
            <div className="input-field">
              <label>Email: </label>
              <input type="email" placeholder="Tu Email" />
            </div>
            <div className="input-field">
              <label>Mensaje: </label>
              <textarea />
            </div>
            <div className="input-field enviar">
              <input type="submit" value="Enviar" />
            </div>
          </form>
        ) : (
          <div className="contenedor-boton">
            <p>Para enviar mensaje debe estar logeado...!</p>
            <a className="boton" onClick={this.login}>
              Iniciar Sesión
            </a>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Contacto;
