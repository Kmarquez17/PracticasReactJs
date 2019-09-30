import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner";

class EditarLibro extends Component {
  //Crear los ref para la edicion de los libros
  tituloRef = React.createRef();
  ISBNRef = React.createRef();
  editorialRef = React.createRef();
  existenciaRef = React.createRef();

  /**Funcion para editar un suscriptor */
  handleEditar = e => {
    e.preventDefault();
    // Crear el objeto que se va actualizar

    const libroActualizado = {
      titulo: this.tituloRef.current.value,
      ISBN: this.ISBNRef.current.value,
      editorial: this.editorialRef.current.value,
      existencia: this.existenciaRef.current.value
    };

    // Estrare fire estore  y hitory
    const { libro, firestore, history } = this.props;

    //Alamecenar en la base de datos con firestore

    firestore
      .update(
        {
          collection: "libros",
          doc: libro.id
        },
        libroActualizado
      )
      .then(() => {
        history.push("/");
      });
  };

  render() {
    //Obtener el libro
    const { libro } = this.props;

    if (!libro) return <Spinner />;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={"/libros"} className="btn btn-secondary ">
            <i className="fas fa-arrow-circle-left mr-1"></i>
            Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h3>
            {/* <i className="fa fas-user-plus mr-1"></i> */}
            Editar Libro
          </h3>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.handleEditar}>
                <div className="form-group">
                  <label>Titulo:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo del libro"
                    required
                    defaultValue={libro.titulo}
                    ref={this.tituloRef}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del libro"
                    required
                    defaultValue={libro.ISBN}
                    ref={this.ISBNRef}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del libro"
                    required
                    defaultValue={libro.editorial}
                    ref={this.editorialRef}
                  />
                </div>

                <div className="form-group">
                  <label>Existencia: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="existencia"
                    placeholder="Existencia del libro"
                    required
                    defaultValue={libro.existencia}
                    ref={this.existenciaRef}
                  />
                </div>

                <input
                  type="submit"
                  value="Editar Libro"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(EditarLibro);
