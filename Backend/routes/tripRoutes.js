import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkBusOwner, checkSeatsNumber } from '../middleware/busMiddleware.js';
import { createTrip, getTripById, SearchBus } from '../controllers/tripController.js';
import { searchValidation, tripValidation } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/trip', protect, tripValidation, checkBusOwner, checkSeatsNumber, createTrip)
router.get('', searchValidation, SearchBus)
router.get('/:id', getTripById)

export default router