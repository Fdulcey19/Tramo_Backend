import { Router } from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { verClienteEmpresa, actualizarClienteEmpresa } from '../controllers/home.empresa.controllers.js';


const router = Router();

router.get("/verClienteEmpresa", validateToken, verClienteEmpresa);
router.put("/verClienteEmpresa/:id", actualizarClienteEmpresa);

export default router;