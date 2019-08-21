import React, { Component, Fragment } from "react";
import Producto from "../Producto/Producto";
import Buscador from "../Buscador/Buscador";
import "./Productos.css";
import axios from "axios";

class Productos extends Component {
  state = {
    productos: [],
    terminoBusqueda: []
  };

  componentWillMount() {
    this.queryAPI();
  }

  queryAPI = () => {
    //     console.log(this.props.auth.getAccessToken());

    const { getAccessToken } = this.props.auth;

    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    const URL = "http://localhost:5000/productos";
    return axios.get(URL, { headers }).then(res =>
      this.setState({
        productos: res.data
      })
    );
  };

  login = () => {
    this.props.auth.login();
  };

  busquedaProducto = busqueda => {
    console.log(busqueda.length);
    if (busqueda.length > 3) {
      //Obtener copia del state
      let productos = [...this.state.productos];

      //Filtrar
      let resultado;
      resultado = productos.filter(
        producto =>
          producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
      );

      //Enviar al State
      this.setState({
        terminoBusqueda: busqueda,
        productos: resultado
      });
    } else {
      this.setState(
        {
          terminoBusqueda: ""
        },
        () => {
          this.queryAPI();
        }
      );
    }
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="productos">
        {isAuthenticated() && (
          <Fragment>
            <h2>Nuestros Productos</h2>
            <Buscador busqueda={this.busquedaProducto} />
            <ul className="lista-productos">
              {Object.keys(this.state.productos).map(producto => (
                <Producto
                  informacion={this.state.productos[producto]}
                  key={producto}
                />
              ))}
            </ul>
          </Fragment>
        )}

        {!isAuthenticated() && (
          <div className="contenedor-boton">
            <p>Para ver el contenido debe estar logeado...!</p>
            <a className="boton" onClick={this.login}>
              Iniciar Sesión
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default Productos;
