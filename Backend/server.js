import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import busRoutes from './routes/busRoutes.js';
import cookieParser from 'cookie-parser';
import tripRoutes from './routes/tripRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

connectDB(); // Connect MongoDB

const port = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/users', userRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(port ,()=>{
    console.log('Server running in '+ port)
})