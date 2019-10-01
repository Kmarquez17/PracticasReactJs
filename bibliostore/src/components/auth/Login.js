import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from 'prop-types';
class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  /**Capturarar el estado del componente */
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /*Iniciar sesion con firebase */
  handleIniciarSesion = e => {
    e.preventDefault();
    //Extraer firebase

    const { firebase } = this.props;

    //Extraer el state
    const { email, password } = this.state;

    //Autenticar el usuario
    firebase
      .login({
        email,
        password
      })
      .then(resultado => console.log(1))
      .catch(error => console.log(2));
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center py-4">
                <i className="fas fa-lock"></i>
                Iniciar Sesión
              </h2>
              <form onSubmit={this.handleIniciarSesion}>
                <div className="form-group">
                  <label>Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password: </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="Iniciar Sesión"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
    firebase : PropTypes.object.isRequired,
  }
  

export default firebaseConnect()(Login);
