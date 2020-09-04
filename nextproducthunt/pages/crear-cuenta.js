import React, { useState } from "react";
import { css } from "@emotion/core";
import Router from 'next/router'

import Layout from "../components/Layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";

import firebase from "../firebase";

const stateInitial = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  const {
    valores,
    errores,
    handleChage,
    handleSubmit,
    handleBlur,
  } = useValidacion(stateInitial, validarCrearCuenta, crearCuentaFn);

  const [error, setError] = useState("");

  const { nombre, email, password } = valores;

  async function crearCuentaFn() {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/')
    } catch (error) {
      console.error(
        "Hubo un error a la hora de crear el usuario",
        error.message
      );
      setError(error.message);
    }
  }

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
            Crear Cuenta
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
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
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Tu email"
                value={email}
                onChange={handleChage}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}
            <Campo>
              <label htmlFor="nombre">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Tu password"
                value={password}
                onChange={handleChage}
                onBlur={handleBlur}
              />
            </Campo>

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
