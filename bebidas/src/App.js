import React from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadosRecetas from "./components/ListadoRecetas";
import CategoriasProvider from "./context/CategoriasContext";
import RecetasProvider from "./context/RecetasContext";
import ModalProvider from "./context/ModalContext";

function App() {
  return (
    <div className="App">
      <CategoriasProvider>
        <RecetasProvider>
          <ModalProvider>
            <Header />

            <div className="container mt-5">
              <div className="row">
                <Formulario />
              </div>
              <ListadosRecetas />
            </div>
          </ModalProvider>
        </RecetasProvider>
      </CategoriasProvider>
    </div>
  );
}

export default App;
