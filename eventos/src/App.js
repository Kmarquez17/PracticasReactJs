import React, { Component } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListaEventos from "./components/ListaEventos"

import CategoriasProvider from "./context/CategoriasContext";
import EventosProvider from "./context/EventosContext";

class App extends Component {
  state = {};
  render() {
    return (
      // <Fragment>

      <EventosProvider>
        <Header titulo="Eventos en React con EventBrite API" />
        <CategoriasProvider>
          <div className="uk-container">
            <Formulario />
            <ListaEventos />
          </div>
        </CategoriasProvider>
      </EventosProvider>
      // </Fragment>
    );
  }
}

export default App;
