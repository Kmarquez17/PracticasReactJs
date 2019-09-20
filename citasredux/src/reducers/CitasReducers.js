const initialState = {
  citas: [],
  validar: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "AGREGAR_CITAS":
      return { ...state, citas: [...state.citas, action.payload] };

    case "BORRAR_CITAS":
      return {
        ...state,
        citas: state.citas.filter(cita => cita.id !== action.payload)
      };

    case "HOLA":
      return  { ...state, validar: action.payload };

    default:
      return state;
  }
}
