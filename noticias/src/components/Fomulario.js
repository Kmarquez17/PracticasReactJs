import React, { Component } from "react";
import PropTypes from 'prop-types';

class Formulario extends Component {
  state = {
    categorias: [],
    categoria: ""
  };

  componentWillMount() {
    this.setState({
      categorias: [
        {
          id: 1,
          name: "business"
        },
        {
          id: 2,
          name: "entertainment"
        },
        {
          id: 3,
          name: "general"
        },
        {
          id: 4,
          name: "health"
        },
        {
          id: 5,
          name: "sports"
        },
        {
          id: 6,
          name: "technology"
        }
      ]
    });
  }

  componentDidMount() {
    this.setState({
      categoria: "general"
    });
  }

  handleOnChange = e => {
    this.setState(
      {
        categoria: e.target.value
      },
      () => {
        //Pasarlo a la pagina principal
        this.props.consultarNoticias(this.state.categoria);
      }
    );
  };

  render() {
    return (
      <div className="buscador row">
        <div className="col s12 m8 offset-m2">
          <form>
          <h2>Encuentra Noticias por Categorias</h2>
            <div className="input-field col s12 m8 offset-m2">
              <select onChange={this.handleOnChange}>
                {this.state.categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.name}>
                    {categoria.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Formulario.propTypes = {
    consultarNoticias:PropTypes.func.isRequired
}

export default Formulario;
