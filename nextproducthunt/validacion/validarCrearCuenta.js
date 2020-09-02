export default function validarCrearCuenta(valores) {
  let errores = {};

  //Validar nombre, email y password
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!valores.email) {
    errores.email = "El email es oblogatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "El email noi valido";
  }

  if (!valores.password) {
    errores.password = "El password es oblogatorio";
  } else if (valores.password.length > 0) {
    errores.password = "El password debe tener al menos 6 caracteres";
  }

  return errores;
}
