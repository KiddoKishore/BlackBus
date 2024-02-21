import React from 'react'
import { Container, Card, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useCancelMutation, useGetTicketQuery } from '../slices/userApiSlice';
import { useParams } from 'react-router-dom';
import { getTicket } from '../slices/tripSlice';
import { toast } from 'react-toastify';

const ViewTicketScreen = () => {
    // const { ticket } = useSelector((state) => state.trip)
    const dispatch = useDispatch();
    // console.log(ticket)
    const { id } = useParams();
    const [ cancel ] = useCancelMutation();
    const { data: ticket, isLoading, refetch } = useGetTicketQuery(id);
    console.log(ticket)

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await cancel(id);
            console.log(res)
            // dispatch(getTicket({...res}))
            toast.success('Ticket Cancelled');
            refetch();
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <Container>
        { isLoading && <h1>Loading...</h1>}
        <div className='flex justify-center font-mono'>
            { ticket && (
                <Card className='m-5 w-96 text-center'>
                <div className={`${ticket.isBooked ? 'bg-green-400' : 'bg-red-500'} w-full flex justify-center p-3`}>
                    <h1>{ticket.isBooked ? 'Booked' : 'Canceled'}</h1>
                </div>
                <h1 className='p-2'>{ticket.origin} - {ticket.destination}</h1>
                <h2 className='p-2'>{ticket.departureTime} - {ticket.arrivalTime}</h2>
                <div className='flex justify-between p-2'>
                    <span>{ticket.busNumber}</span>
                    <span>{ticket.date.slice(0,10)}</span>
                </div>
                <div className='p-2'>
                    <h1>Passengers</h1>
                    <table className='table-fixed'>
                        <thead>
                        <tr>
                            <th className='px-1'>Name</th>
                            <th className='px-1'>Age</th>
                            <th className='px-1'>Seat No</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            ticket.passengers.map((passenger) => (
                                <tr className='text-start'>
                                    <td className='px-1'>{passenger.name}</td>
                                    <td className='px-1'>{passenger.age}</td>
                                    <td className='px-1'>{passenger.seatNo}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <div className='border-t-2 border-dashed my-3 border-black'>
                        <span className='flex justify-between p-3'>
                            <h1>Number of Seats</h1>
                            <h1>{ticket.numberOfSeats}</h1>
                        </span>
                        <span className='flex justify-between p-3'>
                            <h1>Total Price</h1>
                            <h1>{ticket.totalPrice}</h1>
                        </span>
                    </div>
                </div>
            </Card>
            )}
        </div>
        { ticket && ticket.isBooked ? (
            <div className='flex justify-center'>
                <Button type='button' onClick={submitHandler} className='bg-black text-white hover:bg-gray-500'>Cancel Ticket</Button>
            </div>
        ) : (
            <> 
            </>
        )}
    </Container>
  )
}

export default ViewTicketScreen

// CICD