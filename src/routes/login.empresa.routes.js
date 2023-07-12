import { Router } from 'express';
import { authClienteEmpresa, updateAddTokenFSB } from '../controllers/login.empresa.controllers.js';
const router = Router();

router.post("/authClienteEmpresa", authClienteEmpresa);
router.put("/addTokenFirebaseEmpresa/:id", updateAddTokenFSB);

export default router;