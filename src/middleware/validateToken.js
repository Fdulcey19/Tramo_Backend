import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const validateToken = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).json("No existe el token");
    }

    const descoded = jwt.verify(token, JWT_SECRET);
    req.idUsuario = descoded.id;
    next();
  } catch (error) {
    return res.status(400).json("!No autorizado!")
  }
};
 