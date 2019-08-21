import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";

class App extends Component {
  state = {
    count: 0,
    msj: ""
  };

  incrementar = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  enviarMsj = e => {
    e.preventDefault();
    alert(this.state.msj);
  };

  componentDidUpdate(prevState, prevProps) {
    console.log(prevState);
    console.log(prevProps);
    console.log(this.state.count);

    if (prevProps.count !== this.state.count) {
      alert("Estado count cambio");
    }else{
      alert("No hay cambio en el estado count por el momento");
    }

    if (prevProps.msj !== this.state.msj) {
      alert("Estado msj cambio");
    } else {
      alert("No hay cambio en el estado msj por el momento");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>Contador: {this.state.count}</p>
            <button onClick={this.incrementar}>Incrementar</button>
          </div>
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <input
                  onChange={e => {
                    e.preventDefault();
                    this.setState({
                      msj: e.target.value
                    });
                  }}
                  type="text"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
