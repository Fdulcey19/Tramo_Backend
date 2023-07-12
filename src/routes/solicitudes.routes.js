import { Router } from 'express';

import { solicitudCon, soliPendientes, verUnicaSolicitudPendiente, rechazarSolicitud, aceptarSolicitud, solicitudesRechazadas, verUnicaSolicitudRechazada } from '../controllers/solicitud.controllers.js';

import multer from 'multer';
import { storage } from '../middleware/cloudinary.js';

const upload = multer({
    storage: storage
})

const router = Router();

const input = upload.fields([{name: 'perfilImgCon'}, {name: 'frente'}, {name: 'volco'}, {name: 'izquierdo'}, {name: 'derecho'}, {name: 'izquierdotrailer'}, {name: 'derechotrailer'}, {name: 'volcotrailer'}]);
router.post("/solicitudCon", input, solicitudCon);

router.get("/solicitudesPendiente", soliPendientes);
router.get("/solicitudesPendiente/:id", verUnicaSolicitudPendiente);

router.put("/rechazarSolicitud/:id", rechazarSolicitud);

router.put("/aceptarSoli/:id", aceptarSolicitud);

router.get("/solicitudesRechazadas", solicitudesRechazadas);
router.get("/solicitudesRechazadas/:id", verUnicaSolicitudRechazada);


export default router;