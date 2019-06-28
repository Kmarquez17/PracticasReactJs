import React, { Component } from "react";
import "./bootstrap.min.css";
import Header from "./components/Header";
import NuevaCita from "./components/NuevaCita";
import ListaCitas from "./components/ListaCitas";

class App extends Component {
  state = {
    citas: []
  };


  /** Cuando la Aplicacion carge */
  componentDidMount(){
      const citasLS = localStorage.getItem('citas')
      if(citasLS){
        this.setState({citas: JSON.parse(citasLS)})
      }

      
  }

  /**Cuando eliminanos o creamos una cita */
  componentDidUpdate(){
    localStorage.setItem("citas", JSON.stringify(this.state.citas))
  }

  /**Eventp para crear citas */
  crearNuevaCita = cita => {
    // Copiar el state actual

    const citas = [...this.state.citas, cita];

    //Agregamos el nuevo state
    this.setState({
      citas
    });
  };

  /** Evento para eliminar citas */
  eliminarCita = (id) => {
      //Tomar una copia del state
      const citasActuales = [...this.state.citas]
 
      //Utilizar filter para eliminar el elemento
      const citas = citasActuales.filter(cita => cita.id !== id)

      //Actualizar el state
      this.setState({citas})
  }

  render() {
    return (
      <div className="container">
        <Header titulo="Administrador de Pacientes Veterinaria" />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas citas={this.state.citas} eliminarCita={this.eliminarCita}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
