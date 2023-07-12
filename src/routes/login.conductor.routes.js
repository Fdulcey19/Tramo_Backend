import { Router } from 'express';
import { authConductor, updateAddTokenFSB } from '../controllers/login.conductor.controllers.js';
const router = Router();

router.post("/authConductor", authConductor);
router.put("/addTokenFirebase/:id", updateAddTokenFSB);

export default router;