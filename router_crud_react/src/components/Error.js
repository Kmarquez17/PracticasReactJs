import React from "react";

const Error = ({ mensaje }) => {
  return (
    <p className="alert-danger p3 my-5 text-center font-weight-bold">
      {mensaje}
    </p>
  );
};

export default Error;
