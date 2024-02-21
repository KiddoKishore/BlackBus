import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useParams,Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const Payment = () => {
    const { id } = useParams();
    const passengers = useSelector((state) => state.pass);
    const { selectedTrip } = useSelector((state) => state.trip);
    const [btn, setBtn ] = useState(true)
    const [ticketId, setTicketId] = useState('');

    const handler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/api/tickets/ticket/${id}`, passengers)
            toast.success('Trip Booked Successfully')
            console.log(res.data._id)
            setBtn(false)
            setTicketId(res.data._id)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }

    return (
        <div className='font-mono text-xl'>
            <h2 className='m-3'><b>Bus Number</b> - {selectedTrip.busNumber}</h2>
            <h2 className='m-3'><b>Date</b> - {selectedTrip.date.slice(0,10)}</h2>
            <h3 className='m-3'><b>Trip</b> - {`${selectedTrip.origin} - ${selectedTrip.destination}`}</h3>
            <div>
                <h2 className='m-3'><b>Passengers :</b></h2>
                {passengers && passengers.passengers.map((passenger) => (
                    <h3 key={passenger.id} className='m-3'>{passenger.name} - {passenger.seatNo}</h3>
                ))}
            </div>
            <h1 className='m-3'><b>Total Price</b> - {`${selectedTrip.price} * ${passengers.passengers.length} = ${selectedTrip.price * passengers.passengers.length}`}</h1>
            {btn ? (
                <Button type='button' variant='contained' onClick={handler} className='bg-green-400 m-3'>Click to Pay</Button>
            ) : (
                <Link to={`/ticket/${ticketId}`}>
                    <Button type='button' variant='contained' className='bg-green-400 m-3'>View Ticket</Button>
                </Link>
            )}
            
        </div>
    );
}

export default Payment;
