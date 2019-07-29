import React, { useState, useEffect } from "react";
import axios from "axios";


function Frase ({frase}) {
  return (
   <div className="frase">
     <h1>{frase.quote}</h1>
     <p>- {frase.author}</p>
   </div>
  )
}

function App() {
  const [frase, setFrase] = useState({});

  const consultarAPI = async () => {
    const resultado = await axios(
      "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
    );

    //Agregar el resultado de la API al state; (similar al this.setState)
    setFrase(resultado.data[0]);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <div className="contenedor">  
        <Frase 
          frase={frase}
        />
        <button onClick={consultarAPI}>Generar Frase</button>
    </div>
  );
}

export default App;
