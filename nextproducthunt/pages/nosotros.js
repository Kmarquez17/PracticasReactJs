import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/Layout/Layout";
const Heading = styled.h1`
  color: red;
`;

const Nosotros = () => {
  return (
    <div>
      <Layout>
        <Heading>Nosotros</Heading>
      </Layout>
    </div>
  );
};

export default Nosotros;
