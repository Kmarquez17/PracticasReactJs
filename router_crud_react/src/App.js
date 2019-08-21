import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

//Component
import Header from "./components/Header";
import Productos from "./components/Productos";
import AgregarProductos from "./components/AgregarProductos";
import EditarProductos from "./components/EditarProductos";
import Producto from "./components/Producto";

function App() {
  const [productos, setProductos] = useState([]);
  const [recargar, setRecargar] = useState(true);

  useEffect(() => {
    if (recargar) {
      const consultarAPI = async () => {
        //Consultar el API de json-server
        const URL = `http://localhost:4000/restaurant`;
        const resultado = await axios.get(URL);
        setProductos(resultado.data);
      };
      consultarAPI();

      //Camabiar el estado de recarga de los productos
      setRecargar(false);
    }
  }, [recargar]);
  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/productos/nuevo"
            render={() => <AgregarProductos setRecargar={setRecargar} />}
          />
          <Route
            exact
            path="/productos"
            render={() => <Productos productos={productos} setRecargar={setRecargar} />}
          />
          <Route
            exact
            path="/productos/editar/:id"
            render={props => {
              //Tomar el ID del producto
              const idProducto = parseInt(props.match.params.id);

              //El prodcuto que se pasa al state
              const producto = productos.filter(
                producto => producto.id === idProducto
              );

              return <EditarProductos producto={producto[0]} setRecargar={setRecargar}/>;
            }}
          />
          <Route exact path="/productos/:id" component={Producto} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos de Reservados</p>
    </Router>
  );
}

export default App;
