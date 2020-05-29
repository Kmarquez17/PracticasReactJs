const Usuarios = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //Revisara si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  //Extraer email y password

  const { email, password } = req.body;

  try {
    //Revisar que haya un usuario con email ya registrado
    let usuario = await Usuarios.findOne({ email });

    if (!usuario) {
      return res.status(400).send({
        msg: "El usuario no existe...!",
      });
    }
    //Revisar el password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto)
      return res.status(400).send({ msg: "Password Incorrecto" });

    //Crear y firmar el JWt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //Firmar JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.status(200).send({
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
