import { Router } from 'express';
import { verDisponibles, verUsuarioNatural, actualizarUsuarioNatural } from '../controllers/home.natural.controllers.js';
import { validateToken } from '../middleware/validateToken.js';
import multer from "multer";
import { storage } from "../middleware/cloudinary.js";

const upload = multer({
  storage: storage,
});

const router = Router();

router.get("/verClienteNatural", validateToken, verUsuarioNatural );

const input = upload.fields([{ name: "perfilImgNT" }]);
router.put("/verClienteNatural/:id", input, actualizarUsuarioNatural );
router.get("/disponiblesHome", validateToken, verDisponibles);

export default router;