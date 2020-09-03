import React from "react";
import { css } from "@emotion/core";

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

const stateInitial = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {
  const crearCuentaFn = () => {
    console.log("creando Cuenta 123");
  };

  const {
    valores,
    errores,
    handleChage,
    handleSubmit,
    handleBlur,
  } = useValidacion(stateInitial, validarCrearCuenta, crearCuentaFn);

  const { nombre, email, password } = valores;

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

            <InputSubmit type="submit" value="Crear cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
