import fetch from "isomorphic-unfetch";

import MasterPage from "../components/Master";
import Precio from "../components/Precio";
import Noticias from "../components/Noticias";
import Eventos from '../components/Eventos'

const Index = props => (
  <MasterPage>
    <div className="row">
      <div className="col-12">
        <h2>Precio Bitcoin</h2>
        <Precio precio={props.precio} />
      </div>
      <div className="col-md-8">
        <h2 className='my-4'>Noticias sobre Bitcoin</h2>
        <Noticias noticias={props.noticias} />
      </div>
      <div className="col-md-4">      
        <h2  className='my-4'>Próximos eventos de Bitcoin</h2>
        <Eventos eventos={props.eventos} />
      </div>
    </div>
  </MasterPage>
);

Index.getInitialProps = async () => {
  const precio = await fetch(`https://api.coinmarketcap.com/v2/ticker/1/`);
  const noticias = await fetch(
    `https://newsapi.org/v2/everything?q=bitcoin&from=2019-08-04&sortBy=publishedAt&apiKey=4a7109eb2bc54b6a89cd9557a2803d7b&language=es`
  );

  const eventos = await fetch(
    `https://www.eventbriteapi.com/v3/events/search/?q=Bitcoin&sort_by=date&location.address=Mexico&token=RGAKKCAHJFXC35MBBUKP`
  );

  const resPrecio = await precio.json();
  const resNoticias = await noticias.json();
  const resEventos = await eventos.json();

  return {
    precio: resPrecio.data.quotes.USD,
    noticias: resNoticias.articles,
    eventos: resEventos.events
  };
};

export default Index;
