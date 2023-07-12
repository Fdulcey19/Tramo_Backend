import { Router } from 'express';
import { conductoresHabilitados, verUnicoConductorHabilitado, inhabilitarConductor, conductoresInhabilitados, verUnicoConductorInhabilitado, habilitarConductor } from '../controllers/datos.conductor.controllers.js';

const router = Router();

router.get("/conductoresHabilitados", conductoresHabilitados);
router.get("/conductoresHabilitados/:id", verUnicoConductorHabilitado);
router.put("/inhabilitarConductor/:id", inhabilitarConductor);

router.get("/conductoresInhabilitados", conductoresInhabilitados);
router.get("/conductoresInhabilitados/:id", verUnicoConductorInhabilitado);
router.put("/habilitarConductor/:id", habilitarConductor);

export default router;