import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  //State para iniciar secion
  const [usuario, setUsuario] = useState({ email: "", password: "" });

  //Extraer usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  //Cuando el usuario quiere iniciar Sesión
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no esten los campops vacios

    //Pasarlo al actions
  };
  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Inicio de Sesión</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email: "
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Contraseña: "
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Obtener una cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
