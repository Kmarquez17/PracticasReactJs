import React, { useState, useContext } from "react";
import { css } from "@emotion/core";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";

import Layout from "../components/Layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";
import { FirebaseContext } from "../firebase";

const stateInitial = {
  nombre: "",
  empresa: "",
  imagen: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  //State de la imagenes
  const [nombreImagen, setNombreImagen] = useState("");
  const [subiendo, setSubiendo] = useState(false);
  const [progeso, setProgeso] = useState(0);
  const [urlImagen, setUrlImagen] = useState("");

  const {
    valores,
    errores,
    handleChage,
    handleSubmit,
    handleBlur,
  } = useValidacion(stateInitial, validarCrearProducto, crearProductoFn);

  const [error, setError] = useState("");

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //Context con las operaciones CRUD
  const { usuario, firebase } = useContext(FirebaseContext);

  //Hook de routing para redireccionar
  const router = useRouter();

  async function crearProductoFn() {
    //Si el usuario no esta autenticado redireccionarlo al login
    if (!usuario) {
      return router.push("/login");
    }

    //Crear el objeto del nuevo producto
    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
    };

    //Insertar en la BD
    firebase.db.collection("productos").add(producto);
    return router.push("/");
  }

  const handleUploadStart = () => {
    setProgeso(0);
    setSubiendo(true);
  };
  const handleProgress = (progreso) => {
    setProgeso(progreso);
  };

  const handleUploadError = (error) => {
    setSubiendo(error);
    console.log(error);
  };
  const handleUploadSuccess = (nombre) => {
    setProgeso(100);
    setSubiendo(false);
    setNombreImagen(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        setUrlImagen(url);
        //console.log(url);
      });
  };

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Nuevo Producto
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Informacion General</legend>

              {errores.nombre && <Error>{errores.nombre}</Error>}
              <Campo>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={handleChage}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.empresa && <Error>{errores.empresa}</Error>}
              <Campo>
                <label htmlFor="empresa">Nombre Empresa o Compañia:</label>
                <input
                  type="text"
                  name="empresa"
                  id="empresa"
                  placeholder="Tu empresa"
                  value={empresa}
                  onChange={handleChage}
                  onBlur={handleBlur}
                />
              </Campo>

              <Campo>
                <label htmlFor="empresa">Imagen:</label>
                <FileUploader
                  accept="image/*"
                  id="imagen"
                  name="imagen"
                  randomizeFilename
                  storageRef={firebase.storage.ref("productos")}
                  onUploadStart={handleUploadStart}
                  onProgress={handleProgress}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                />
              </Campo>

              {errores.url && <Error>{errores.url}</Error>}
              <Campo>
                <label htmlFor="url">URL:</label>
                <input
                  type="url"
                  placeholder="URL de tu producto"
                  name="url"
                  id="url"
                  value={url}
                  onChange={handleChage}
                  onBlur={handleBlur}
                />
              </Campo>
            </fieldset>

            <fieldset>
              <legend>Sobre tu producto</legend>
              {errores.descripcion && <Error>{errores.descripcion}</Error>}
              <Campo>
                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  name="descripcion"
                  id="descripcion"
                  value={descripcion}
                  onChange={handleChage}
                  onBlur={handleBlur}
                />
              </Campo>
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear producto" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default NuevoProducto;
