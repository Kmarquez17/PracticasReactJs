import {
  VALIDAR_FORMULARIO,
  VALIDAR_FORMULARIO_EXITO,
  VALIDAR_FORMULARIO_ERROR
} from "../types";

export function validarFormularioActions() {
  return dispacth => {
    dispacth(iniciarValidaciones());
  };
}

export const iniciarValidaciones = () => {
  return {
    type: VALIDAR_FORMULARIO
  };
};

export const validacionExitoActions = () => {
    return {
      type: VALIDAR_FORMULARIO_EXITO
    };
  };

export const validacionErrorActions = () => {
  return {
    type: VALIDAR_FORMULARIO_ERROR
  };
};
