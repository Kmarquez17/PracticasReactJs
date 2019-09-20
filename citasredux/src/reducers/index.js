import { combineReducers } from "redux";
import CitasReducers from "./CitasReducers";
import ErrorReducers from "./ErrorReducers";

export default combineReducers({
  citas: CitasReducers,
  error: ErrorReducers
});
