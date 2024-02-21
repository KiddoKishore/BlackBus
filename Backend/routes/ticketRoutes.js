import express from 'express';
import { BookTrip, getTicketById, getAllTickets, cancelTicket } from '../controllers/ticketController.js';
import { checkAuth, protect } from '../middleware/authMiddleware.js';
import { ticketValidation } from '../middleware/validationMiddleware.js';
import { checkSeats, checkSameSeats } from '../middleware/busMiddleware.js';

const router = express.Router();

router.post('/ticket/:trip_id', protect, ticketValidation, checkSameSeats, checkSeats, BookTrip)
router.get('',protect, getAllTickets)
router.route('/:id').get(protect, checkAuth, getTicketById).put(protect, checkAuth, cancelTicket)

export default router