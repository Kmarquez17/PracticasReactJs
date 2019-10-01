import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Custom Reducer
import buscarUsuarioReducer from "./reducers/buscarUsuarioReducers";

//Configurar fireStore
const firebaseConfig = {
  apiKey: "AIzaSyB6_M-DX6dmZCTRq-PRWJYrykn1v-EJYfE",
  authDomain: "bibliostore-79a8a.firebaseapp.com",
  databaseURL: "https://bibliostore-79a8a.firebaseio.com",
  projectId: "bibliostore-79a8a",
  storageBucket: "bibliostore-79a8a.appspot.com",
  messagingSenderId: "561666033354",
  appId: "1:561666033354:web:c843224460a16e30145633",
  measurementId: "G-09LRWM31FX"
};

//Inicialiazar firebase
firebase.initializeApp(firebaseConfig);

//Configuracion de react redux
const rrfconfig = {
  useProfile: "users",
  useFirestoreForProfile: true
};

//Crear el enhacer con compose de redux y firebase
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfconfig),
  reduxFirestore(firebase)
)(createStore);

//Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  usuario: buscarUsuarioReducer
});

//State inicial
const initialState = {};

//Crear el Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

export default store;
