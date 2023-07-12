import ClienteNatural from "../models/ClienteNatural.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authClienteNatural = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json(" !Todos los datos son requeridos! ");
    }

    const clienteFound = await ClienteNatural.findOne({
      correoElectronicoPNA: correo,
    });
    if (!clienteFound) {
      return res.status(400).json(" !Correo Incorrecto! ");
    }

    const validatePassword = await ClienteNatural.comparePassword(
      contrasena,
      clienteFound.contrasenaPNA
    );

    if (clienteFound.estadoCLN.habilitadoPNA === false) {
      return res.status(400).json("!Cliente Inhabilitado!");
    }

    if (!validatePassword) {
      return res.status(400).json(" !Contraseña Incorrecta! ");
    }

    const token = jwt.sign({ id: clienteFound._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token: token,
      messagge: " !login Cliente Natural Correcto! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const updateAddTokenFSB = async(req, res)=>{
  try {
    const { id } = req.params;
    const conductorActualizadoAddToken = await ClienteNatural.findByIdAndUpdate(id, req.body);
    if(!conductorActualizadoAddToken){
      return res.status(400).json("No se puedo agregar el token de firebase")
    }
    res.status(200).json("Token firebase agregado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}

