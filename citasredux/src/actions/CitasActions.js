export const agregarCitasAction = cita => {
  return {
    type: "AGREGAR_CITAS",
    payload: cita
  };
};

export const borrarCitasAction = id => {
  return {
    type: "BORRAR_CITAS",
    payload: id
  };
};

export const click1 = num => {
  return {
    type: "HOLA",
    payload: num
  };
};
