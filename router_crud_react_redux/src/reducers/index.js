import { combineReducers } from "redux";
import ProductosReducers from "./ProductosReducers";
import ValidacionReducers from "./ValidacionReducers";

export default combineReducers({
  productos: ProductosReducers,
  error: ValidacionReducers
});
