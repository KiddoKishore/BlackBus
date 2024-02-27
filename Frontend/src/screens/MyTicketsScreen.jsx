import React from 'react';
import { useTicketsQuery } from '../slices/userApiSlice';
import { Card, Button } from '@mui/material';
import { getTicket } from '../slices/tripSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const MyTicketsScreen = () => {
    const { data: tickets, isError, error } = useTicketsQuery();
    const dispatch = useDispatch();

    console.log(isError);

    if (isError){
        return (
            <>
                <h1>{error?.data?.message}</h1>
            </>
        )
    }

    const handleViewTicket = (ticket) => {
        dispatch(getTicket(ticket));
    };

    // Create a copy of the tickets array and then reverse it
    const reversedTickets = tickets ? [...tickets].reverse() : [];

    return (
        <div className='flex flex-wrap justify-center'>
            {
                reversedTickets.map((ticket) => (
                    <Card key={ticket._id} className={`m-5 w-96 p-3 ${ ticket.isBooked ? ticket.date.slice(0, 10) < new Date().toISOString().slice(0, 10) ? 'bg-yellow-400/75' : 'bg-green-400/75' : 'bg-red-400/75'} ${ ticket.date < new Date() && 'bg-yellow-400'}`}>
                        <div className='flex justify-between p-2'>
                            <span><h2>{ticket.origin}</h2><h3>{ticket.departureTime}</h3></span>
                            <span><h1>{ticket.busNumber}</h1><h2>{ticket.date.slice(0, 10)}</h2></span>
                            <span><h2>{ticket.destination}</h2><h3>{ticket.arrivalTime}</h3></span>
                        </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='px-1'>Name</th>
                                        <th className='px-1'>Age</th>
                                        <th className='px-1'>Seat No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ticket.passengers.map((passenger, index) => (
                                            <tr key={index}>
                                                <td className='px-1'>{passenger.name}</td>
                                                <td className='px-1'>{passenger.age}</td>
                                                <td className='px-1'>{passenger.seatNo}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <h1 className='p-1'>Total Price : {ticket.totalPrice}</h1>
                            <Link to={`/ticket/${ticket._id}`}>
                                <Button type='button' onClick={() => handleViewTicket(ticket)}>View Full Ticket</Button>
                            </Link>
                    </Card>
                ))
            }
        </div>
    );
};

export default MyTicketsScreen;
