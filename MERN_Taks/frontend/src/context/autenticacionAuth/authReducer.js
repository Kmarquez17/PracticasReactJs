import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  //   LOGIN_EXITOSO,
  LOGIN_ERROR,
  //   CERRAR_SESION,
} from "../../types";
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
      };

    case REGISTRO_ERROR:
      return {
        ...state,
        token: null,
        autenticado: false,
        mensaje: payload,
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: payload.usuario,
      };

    // case LOGIN_EXITOSO:

    case LOGIN_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
      };

    // case CERRAR_SESION:

    default:
  }
};
