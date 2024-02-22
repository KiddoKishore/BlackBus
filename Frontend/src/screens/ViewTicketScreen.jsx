import React from 'react'
import { Container, Card, Button } from '@mui/material';
import { useCancelMutation, useGetTicketQuery } from '../slices/userApiSlice';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewTicketScreen = () => {
    const { id } = useParams();
    const [ cancel ] = useCancelMutation();
    const { data: ticket, isLoading, refetch } = useGetTicketQuery(id);
    console.log(ticket)

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await cancel(id);
            console.log(res)
            const result = confirm("Are you sure! Do you want to Cancel this Ticket")
            if (result === true){
                toast.success('Ticket Cancelled');
                refetch();
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <Container>
        { isLoading && <h1>Loading...</h1>}

        <Link to={'/tickets'}>
            <Button variant="outlined" type='button' className='m-5 bg-black' sx={{color: 'white', borderColor: 'black', '&:hover': {
            borderColor: 'white',
            backgroundColor: 'gray',
            }}}><ArrowBackIcon />Go Back</Button>
        </Link>

        <div className='flex justify-center font-mono'>
            { ticket && (
                <Card className='m-5 w-96 text-center'>
                <div className={`${ticket.isBooked ? ticket.date.slice(0, 10) < new Date().toISOString().slice(0, 10) ? 'bg-yellow-400' : 'bg-green-400' : 'bg-red-500'} w-full flex justify-center p-3`}>
                    <h1>{ticket.isBooked ? ticket.date.slice(0, 10) < new Date().toISOString().slice(0, 10) ? 'Expired' : 'Booked' : 'Canceled'}</h1>
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
            ticket.date.slice(0, 10) > new Date().toISOString().slice(0, 10) ? (
                <div className='flex justify-center'>
                <Button type='button' onClick={submitHandler} className='bg-red-600 text-white hover:bg-black'>Cancel Ticket</Button>
            </div>
            ) : (
                <></>
            )
        ) : (
            <> 
            </>
        )}
    </Container>
  )
}

export default ViewTicketScreen

// CICD