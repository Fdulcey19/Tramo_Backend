import { Router } from "express";
import {
  registroClienteNatural,
  verClienteNaturalHabilitado,
  inhabilitarClienteNatural,
  verClienteNaturalInhabilitado,
  habilitarClienteNatural,
} from "../controllers/cliente.natural.controllers.js";
import multer from "multer";
import { storage } from "../middleware/cloudinary.js";

const upload = multer({
  storage: storage,
});

const router = Router();

// registro cliente natural
const input = upload.fields([{ name: "perfilImgNT" }]);
router.post("/registroClienteNatural", input, registroClienteNatural);

// ver clientes naturales habilitados
router.get("/datosClientesNaturalHB", verClienteNaturalHabilitado);
router.put("/datosClientesNaturalHB/:id", inhabilitarClienteNatural);

router.get("/datosClientesNaturalIN", verClienteNaturalInhabilitado);
router.put("/datosClientesNaturalIN/:id", habilitarClienteNatural);

export default router;
