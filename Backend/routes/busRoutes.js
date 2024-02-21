import express from 'express';
import {protect, admin} from '../middleware/authMiddleware.js'
import { createBus } from '../controllers/busController.js';
import { busValidation } from '../middleware/validationMiddleware.js';
import { checkBusExists } from '../middleware/busMiddleware.js';

const router = express.Router();

router.post('/bus', protect, admin, busValidation, checkBusExists, createBus)

export default router