import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

//Store
import store from "./store";

//Componentes Vistas
import Navbar from "./components/Layout/Navbar";

import Suscriptores from "./components/Suscriptores/Suscriptores";
import NuevoSuscriptor from "./components/Suscriptores/NuevoSuscriptor";
import EditarSuscriptor from "./components/Suscriptores/EditarSuscriptor";
import MostrarSuscriptor from "./components/Suscriptores/MostrarSuscriptor";

function App() {
  return (
    <Provider store={store}>
      {/* <h1>Hola Como estas</h1> */}
      <HashRouter>
        <Navbar />
        <main className="container">
          <Switch>
            <Route exact path="/suscriptores" component={Suscriptores} />
            <Route
              exact
              path="/suscriptores/mostrar/:id"
              component={MostrarSuscriptor}
            />
            <Route
              exact
              path="/suscriptores/nuevo"
              component={NuevoSuscriptor}
            />
            <Route
              exact
              path="/suscriptores/editar/:id"
              component={EditarSuscriptor}
            />

            <Route
              component={() => {
                return <h1>Página no encontrada...!</h1>;
              }}
            />
          </Switch>
        </main>
      </HashRouter>
    </Provider>
  );
}

export default App;
