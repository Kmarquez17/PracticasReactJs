const Usuarios = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  //Revisara si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  //Extraer email y password
  const { email, password } = req.body;
  try {
    let usuario = await Usuarios.findOne({ email });

    if (usuario) {
      console.log("Aqui");
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    }

    ///crear el nuevo usuario
    usuario = new Usuarios(req.body);

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

        res.status(200).json({
          token,
        });
      }
    );

    //Hash password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    ///Guardar el nuevo usuario
    await usuario.save();
    //Mensaje de confirmacion
    res.status(200).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
