import Administrador from "../models/Administrador.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const createAdmin = async (req, res) => {
  try {
    const { usuario, correo, contrasena } = req.body;
    if (!usuario || !correo || !contrasena) {
      return res.status(400).json("! Se requieren todos los datos !");
    }
    const adminModel = new Administrador(req.body);
    adminModel.password = await adminModel.encryptPassword(contrasena);
    adminModel.correoAdmin = correo;
    await adminModel.save();
    res.status(200).json("! Admin Creado !");
  } catch (error) {
    console.log(error);
    return res.status(500).json("! Error en el servidor !");
  }
};

export const auchAdmin = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    if (!correo || !contrasena) {
      return res.status(400).json("! Se requieren todos los datos !");
    }

    const existAdmin = await Administrador.findOne({ correoAdmin: correo });
    if (!existAdmin) {
      return res.status(400).json("! Correo Incorrecto !");
    }

    const validatePassword = await existAdmin.comparePassword(contrasena);
    if (!validatePassword) {
      return res.status(400).json("! Contraseña Incorrecta !");
    }

    const token = jwt.sign({ idAdmin: existAdmin._id, nameAdmin:existAdmin.usuario }, JWT_SECRET, { expiresIn: '24h'});

    res.status(200).json({
        token: token,
        messagge: 'Bienvenido Administrador Tramo'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json("! Error en el servidor !");
  }
};
