import React, { useState } from "react";
import { css } from "@emotion/core";
import Router from "next/router";

import Layout from "../components/Layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "../components/ui/Formulario";

//Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";

import firebase from "../firebase";

const stateInitial = {
  email: "",
  password: "",
};

const Login = () => {
  const {
    valores,
    errores,
    handleChage,
    handleSubmit,
    handleBlur,
  } = useValidacion(stateInitial, validarIniciarSesion, IniciarFuncionFn);

  const [error, setError] = useState("");

  const { email, password } = valores;

  async function IniciarFuncionFn() {
    try {
      await firebase.login(email, password);      
      Router.push("/");
    } catch (error) {
      console.error("Hubo un error a la hora de iniciar sesion", error.message);
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
            Iniciar Sesión
          </h1>
          <Formulario onSubmit={handleSubmit} noValidate>
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

            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
