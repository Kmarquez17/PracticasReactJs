import React, { useState } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, setValores] = useState(stateInicial);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn(); //fn igual a la funcion que se ejecuta en el componente
      }
      setSubmitForm(false);
    }
  }, []);

  //Funcion que se ejecuta conforme el usuario  escriba algo

  const handleChage = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion que se ejecuta cuando el usuario hace submit

  const handleSubmit = () => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
    setSubmitForm(true);
  };

  return {
    valores,
    errores,
    submitForm,
    handleChage,
    handleSubmit
  };
};

export default useValidacion;
