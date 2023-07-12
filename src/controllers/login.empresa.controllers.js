import ClienteEmpresa from "../models/ClienteEmpresa.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authClienteEmpresa = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json(" !Todos los datos son requeridos! ");
    }

    const empresaFound = await ClienteEmpresa.findOne({
      correoElectronicoPJU: correo,
    });
    if (!empresaFound) {
      return res.status(400).json({
        token: null,
        messagge: "Correo Incorrecto",
      });
    }

    const validatePassword = await ClienteEmpresa.comparePassword(
      contrasena,
      empresaFound.contrasenaPJU
    );
    if (!validatePassword) {
      return res.status(400).json({
        token: null,
        messagge: "Contraseña Incorrecto",
      });
    }

    const token = jwt.sign({ id: empresaFound._id }, JWT_SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({
      token: token,
      messagge: " !login Empresa Correcto! ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
};

export const updateAddTokenFSB = async(req, res)=>{
  try {
    const { id } = req.params;
    const conductorActualizadoAddToken = await ClienteEmpresa.findByIdAndUpdate(id, req.body);
    if(!conductorActualizadoAddToken){
      return res.status(400).json("No se puedo agregar el token de firebase")
    }
    res.status(200).json("Token firebase agregado correctamente");
  } catch (error) {
    console.log(error);
    return res.status(500).json(" !Error en el servidor! ");
  }
}
