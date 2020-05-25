const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Leer el token del headers
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (!token)
    return res.status(401).send({
      msg: "No hay token, permiso no válido",
    });
  //Validar el token

  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).send({ msg: "Token no válido" });
  }
};
