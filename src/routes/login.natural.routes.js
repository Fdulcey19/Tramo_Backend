import { Router } from 'express';

import { authClienteNatural, updateAddTokenFSB } from '../controllers/login.natural.controllers.js';

const router = Router();

router.post("/authClienteNatural", authClienteNatural);
router.put("/addTokenFirebaseNatural/:id", updateAddTokenFSB);

export default router;