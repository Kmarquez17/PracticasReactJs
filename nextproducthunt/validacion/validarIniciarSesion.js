export default function validarIniciarSesion(valores) {
  let errores = {};

  //Validar email y password

  if (!valores.email) {
    errores.email = "El email es oblogatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "El email no valido";
  }

  if (!valores.password) {
    errores.password = "El password es oblogatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe tener al menos 6 caracteres";
  }

  return errores;
}
