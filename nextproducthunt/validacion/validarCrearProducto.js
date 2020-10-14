export default function validarCrearProducto(valores) {
  let errores = {};

  //Validar nombre, email y password
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!valores.empresa) {
    errores.empresa = "Nombre de empresa es oblogatorio";
  }

  if (!valores.url) {
    errores.url = "La url del producto es oblogatorio";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "URL mal formateada o no válida";
  }

  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripción al producto";
  }

  return errores;
}
