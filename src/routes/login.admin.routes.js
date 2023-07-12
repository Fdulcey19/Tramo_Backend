import { Router } from 'express';
import { createAdmin, auchAdmin } from '../controllers/login.admin.controllers.js';

const router = Router();


router.post("/register", createAdmin);
router.post("/auchAdmin", auchAdmin);

export default router;