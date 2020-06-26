import React from "react";
import styled from "@emotion/styled";

import Layout from "../components/Layout/Layout";
const Heading = styled.h1`
  color: red;
`;

const Home = () => {
  return (
    <div>
      <Layout>
        <Heading>Inicio</Heading>
      </Layout>
    </div>
  );
};

export default Home;
