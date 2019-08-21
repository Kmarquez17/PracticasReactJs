import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navegacion.css";

class Navegacion extends Component {
  logout = () => {
    this.props.auth.logout();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    let resultado = isAuthenticated() ? <a onClick={this.logout}>Cerrar Sesión</a> : null;

//     if (isAuthenticated()) {
//       resultado = <a onClick={this.logout}>Cerrar Sesión</a>;
//     } else {
//       resultado = null;
//     }

    return (
      <nav className="navegacion">
        <NavLink to={"/nosotros"} activeClassName="activo">
          Nosotros
        </NavLink>
        <NavLink to={"/productos"} activeClassName="activo">
          Productos
        </NavLink>
        <NavLink to={"/contacto"} activeClassName="activo">
          Contacto
        </NavLink>
        {resultado}
      </nav>
    );
  }
}

export default Navegacion;
