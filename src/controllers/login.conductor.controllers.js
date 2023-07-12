import Conductores from "../models/Conductores.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authConductor = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json(" !Todos los datos son requeridos! ");
    }

    const conductorFound = await Conductores.findOne({
      correoElectronicoCON: correo,
    });
    if (!conductorFound) {
      return res.status(400).json({
        token: null,
        messagge: "Correo Incorrecto",
      });
    }

    const validatePassword = await Conductores.comparePassword(
      contrasena,
      conductorFound.contrasenaCON
    );
    if (!validatePassword) {
      return res.status(400).json({
        token: null,
        messagge: "Contraseña Incorrecta",
      });
    }

    const ingresado = conductorFound.estadoCON.IngresoCON;
    const habilitado = conductorFound.estadoCON.habilitadoCON;
    if (!ingresado || !habilitado) {
      return res.status(400).json({
        token: null,
        messagge: "!Debes esperar a ser acepetado en la app TRAMO!",
      });
    }

    const token = jwt.sign({ id: conductorFound._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token: token,
      messagge: " !login Conductor Correcto! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const updateAddTokenFSB = async(req, res)=>{
  try {

    const { id } = req.params;
    const conductorActualizadoAddToken = await Conductores.findByIdAndUpdate(id, req.body);
    if(!conductorActualizadoAddToken){
      return res.status(400).json("No se puedo agregar el token de firebase")
    }
    res.status(200).json("Token firebase agregado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}


