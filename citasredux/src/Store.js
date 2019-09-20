import { createStore } from "redux";
import reducers from "./reducers";
import { obtenerStorage, guardarStorage } from "./localStorage";
//Definir state inicial
//Obtener las citas en el localStorage
const initialState = obtenerStorage();

const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  guardarStorage({
    citas: store.getState().citas
  });
});

export default store;
