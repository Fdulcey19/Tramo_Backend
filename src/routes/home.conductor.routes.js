import { Router } from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { verConductor, actualizarDatosConductor } from '../controllers/home.conductor.controllers.js';

import multer from "multer";
import { storage } from "../middleware/cloudinary.js";

const upload = multer({
  storage: storage,
});

const router = Router();
router.get("/verConductor",validateToken, verConductor);
const input = upload.fields([{ name: "perfilImgCon" }]);
router.put("/verConductor/:id", input, actualizarDatosConductor);


export default router;