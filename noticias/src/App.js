import React, { Component } from "react";
import Header from "./components/Header";
import ListaNoticias from "./components/ListaNoticias";
import Formulario from "./components/Fomulario";
class App extends Component {
  state = {
    noticias: []
  };

  componentDidMount() {
    this.consultarNoticias();
  }

  consultarNoticias = async (categoria = "general") => {
    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=4a7109eb2bc54b6a89cd9557a2803d7b
    `;

    const respuesta = await fetch(URL);
    const noticias = await respuesta.json();

    // console.log(noticias.articles)

    this.setState({
      noticias: noticias.articles
    });

    console.log(this.state.noticias);
  };
  render() {
    return (
      <React.Fragment>
        <Header titulo="Noticias React API" />

        <div className="container white contenedor-noticias">
          <Formulario consultarNoticias={this.consultarNoticias}/>
          <ListaNoticias noticias={this.state.noticias} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
