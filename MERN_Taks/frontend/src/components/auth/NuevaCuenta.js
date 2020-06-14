import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacionAuth/authContext";

const NuevaCuenta = (props) => {
  //State para iniciar secion
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confimar: "",
  });
  //Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Extraer auth funciones, estados
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  //En caso de que el usuario se haya registrado o registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      return;
    }
  }, [mensaje, autenticado, props.history]);

  //Extraer usuario
  const { nombre, email, password, confimar } = usuario;

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
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confimar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Validar que el password  minimo de  6 caracteres
    // y que sena iguales
    if (password.length < 6) {
      mostrarAlerta(
        "El passaword debe ser al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    if (password !== confimar) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }

    //Pasarlo al actions
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una Cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre: "
              onChange={onChange}
              value={nombre}
            />
          </div>
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
            <label htmlFor="password">Confirmar Contraseña</label>
            <input
              type="password"
              id="confimar"
              name="confimar"
              placeholder="Confirmar Contraseña: "
              onChange={onChange}
              value={confimar}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
