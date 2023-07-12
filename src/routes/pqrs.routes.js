import { Router } from 'express';
import { verPqrs, crearPqrs, verUniquePqrs, responderPqrs, verMisPqrs } from '../controllers/pqrs.controllers.js';

const router = Router();

router.get("/pqrs", verPqrs)
router.get("/pqrs/:id", verUniquePqrs)
router.post("/pqrs", crearPqrs)
router.put("/pqrs/:id", responderPqrs)
router.get("/myPqrs/:id", verMisPqrs)

export default router;