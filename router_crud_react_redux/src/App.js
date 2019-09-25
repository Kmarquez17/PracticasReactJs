import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Store from "./Store";

//Componentes Principales
import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

function App() {
  return (
    <HashRouter>
      <Provider store={Store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/producto/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
