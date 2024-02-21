import React from 'react';
import { useTicketsQuery } from '../slices/userApiSlice';
import { Card, Button } from '@mui/material';
import { getTicket } from '../slices/tripSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const MyTicketsScreen = () => {
    const { data: tickets } = useTicketsQuery();
    const dispatch = useDispatch();

    console.log(tickets);

    const handleViewTicket = (ticket) => {
        dispatch(getTicket(ticket));
    };

    // Create a copy of the tickets array and then reverse it
    const reversedTickets = tickets ? [...tickets].reverse() : [];

    return (
        <div className='flex flex-wrap'>
            {
                reversedTickets.map((ticket) => (
                    <Card key={ticket._id} className={`m-5 w-96 p-3 ${ ticket.isBooked ? 'bg-green-400/75' : 'bg-red-400/75'}`}>
                        <div className='flex justify-between'>
                            <span><h2>{ticket.origin}</h2><h3>{ticket.departureTime}</h3></span>
                            <span><h1>{ticket.busNumber}</h1><h2>{ticket.date.slice(0, 10)}</h2></span>
                            <span><h2>{ticket.destination}</h2><h3>{ticket.arrivalTime}</h3></span>
                        </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Seat No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ticket.passengers.map((passenger, index) => (
                                            <tr key={index}>
                                                <td>{passenger.name}</td>
                                                <td>{passenger.age}</td>
                                                <td>{passenger.seatNo}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <h1>Total Price : {ticket.totalPrice}</h1>
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
