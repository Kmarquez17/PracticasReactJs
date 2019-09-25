import axios from "axios";

const clienteAxios = axios.create({
  // baseURL: "http://localhost:4000"
  baseURL: "https://my-json-server.typicode.com/kmarquez17/json_server"
  
});

export default clienteAxios;