import React from "react";
import Header from "./Header";
const Layout = (props) => {
  return (
    <>
      <h1>Header</h1>
      <Header />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
