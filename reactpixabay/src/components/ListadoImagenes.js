import React from "react";

const Imagen = ({ imagen }) => {
  const { largeImageURL, likes, previewURL, tags, views } = imagen;
  return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
      <div className="card">
        <img src={previewURL} alt={tags} className="card-img-top" />
        <div className="card-body">
          <p className="card-text">{likes} Me gustas</p>
          <p className="card-text">{views} Vistas</p>
        </div>
        <div className="card-footer">
          <a
            href={largeImageURL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-block"
          >
            Ver Imagen
          </a>
        </div>
      </div>
    </div>
  );
};

function ListadoImagenes({ imagenes }) {
  return (
    <div className="col-12 p-5 row">
      {imagenes.map(imagen => (
        <Imagen key={imagen.id} imagen={imagen} />
      ))}
    </div>
  );
}

export default ListadoImagenes;
