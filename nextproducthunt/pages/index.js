import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout/Layout";
import { FirebaseContext } from "../firebase";
import styled from "@emotion/styled";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const Producto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 1rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &::last-of-type {
      margin: 0;
    }
  }
`;

const Imagen = styled.img`
  width: 200px;
`;

const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Home = () => {
  const [productos, setProdcutos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db
        .collection("productos")
        .orderBy("creado", "desc")
        .onSnapshot(manejarSnapshot);
    };
    obtenerProductos();
  }, []);

  const manejarSnapshot = (snapshot) => {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setProdcutos(productos);
  };
  return (
    <div>
      <Layout>
        <div className="container">
          <ul className="bg-white">
            {productos.map((producto) => {
              {
                /* console.log(producto); */
              }
              const {
                id,
                comentarios,
                creado,
                descripcion,
                empresa,
                nombre,
                url,
                urlImagen,
                votos,
              } = producto;
              return (
                <Producto>
                  <DescripcionProducto>
                    <div>
                      <Imagen src={urlImagen} alt={descripcion} />
                    </div>
                    <div>
                      <h1>{nombre}</h1>

                      <p>{descripcion}</p>

                      <Comentarios>
                        <div>
                          <img
                            src="/static/img/comentario.png"
                            alt="Comentario"
                          />
                          <p>{comentarios.length} Comentarios</p>
                        </div>
                      </Comentarios>
                      <p>
                        Publicado hace:{" "}
                        {formatDistanceToNow(new Date(creado), { locale: es })}
                      </p>
                    </div>
                  </DescripcionProducto>
                  <Votos>
                    <div>&#9650;</div>
                    <p>{votos}</p>
                  </Votos>
                </Producto>
              );
            })}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
