import { Router } from "express";
import multer from "multer";
import { storage } from "../middleware/cloudinary.js";

import { registroClienteEmpresa, verClienteEmpresaHabilitado, inhabilitarClienteEmpresa, verClienteEmpresaInhabilitado, habilitarClienteEmpresa } from '../controllers/cliente.empresa.controllers.js';

const upload = multer({
  storage: storage,
});

const router = Router();

// registro cliente natural
router.post("/registroClienteEmpresa", registroClienteEmpresa);

// ver clientes naturales habilitados
router.get("/datosClientesEmpresaHB", verClienteEmpresaHabilitado);
router.put("/datosClientesEmpresaHB/:id", inhabilitarClienteEmpresa);

router.get("/datosClientesEmpresaIN", verClienteEmpresaInhabilitado);
router.put("/datosClientesEmpresaIN/:id", habilitarClienteEmpresa);

export default router;
