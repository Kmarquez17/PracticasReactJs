const Evento = ({ evento }) => {
  const { name, url, description } = evento;

  let titulo = name.text;
  let desc = description.text;

  if (titulo.length > 150) {
    titulo = titulo.substr(0, 100) + " ...";
  }

  if (desc) {
    desc = desc.substr(0, 100) + " ...";
  }
  return (
    <a href={url} className="list-group-item activate text-light mb-4">
      <h3 className="mb-3">{titulo}</h3>
      <p className="mb-1">{desc}</p>
    </a>
  );
};

const Eventos = ({ eventos }) => {
  //   const eventosId = Object.keys(eventos);
  let max = 21    
  return (
    <div className="list-group">
      {eventos.map((evento, key) => {
        if (key < max){
            return(
                <Evento key={key} evento={evento} />
            )  
        }
    })}
    </div>
  );
};

export default Eventos;
