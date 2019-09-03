const Noticia = ({ noticia }) => {
  const { urlToImage, url, title, description, source } = noticia;

  let imagen;
  if (urlToImage != "") {
    imagen = <img src={urlToImage} alt={title} className="card-img-top" />;
  } else {
    imagen = <p className="text-center my-5">Imagen no disponible</p>;
  }
  return (
    <div className="col-md-6 col-12 mb-4">
      <div className="card">
        <div className="card-image">{imagen}</div>
        <div className="card.body">
          <h3 className="card-title">{title}</h3>
          <p className="card-text">{description}</p>
          <p className="card-text">{source.name}</p>
          <a href={url} target="_blank" className="btn btn-primary">
            Leer Noticia
          </a>
        </div>
      </div>
    </div>
  );
};

const Noticias = ({ noticias }) => {
  return (
    <div className="row">
      {noticias.map((noticia, i) => (
        <Noticia key={i} noticia={noticia} />
      ))}
    </div>
  );
};

export default Noticias;
