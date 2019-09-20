import React from "react";
//redux
import { Provider } from "react-redux";
import store from "./Store";

import AgregarCitas from "./components/AgregarCitas";
import ListadoCitas from "./components/ListadosCitas";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <header>
          <h1 className="text-center">
            Administrador de Pacientes de Veterinarias
          </h1>
          <div className="row mt-5">
            <div className="col-md-6">
              <AgregarCitas />
            </div>
            <div className="col-md-6">
              <ListadoCitas />
            </div>
          </div>
        </header>
      </div>
    </Provider>
  );
}

export default App;
