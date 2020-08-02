import React from "react";
import { css } from "@emotion/core";

import Layout from "../components/Layout/Layout";
import { Formulario, Campo, InputSubmit } from "../components/ui/Formulario";

const CrearCuenta = () => {
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
          <Formulario>
            <Campo>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Tu nombre"
              />
            </Campo>
            <Campo>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Tu email"
              />
            </Campo>
            <Campo>
              <label htmlFor="nombre">Password:</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Tu password"
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
