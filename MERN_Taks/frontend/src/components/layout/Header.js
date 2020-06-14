import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/autenticacionAuth/authContext";

const Header = () => {
  //Extraer la informacion de autentificacion
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion, usuarioAutenticado } = authContext;
  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => {
            cerrarSesion();
          }}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
