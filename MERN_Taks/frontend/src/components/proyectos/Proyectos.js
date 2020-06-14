import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import FormTareas from "../tareas/FormTareas";
import ListadoTareas from "../tareas/ListadoTareas";

import AuthContext from "../../context/autenticacionAuth/authContext";
const Proyecto = () => {
  //Extraer la informacion de autentificacion
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;
  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Header />
        <main>
          <FormTareas />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyecto;
