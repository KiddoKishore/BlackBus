import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../constants';
import { selectTrip } from '../slices/tripSlice';
import { Button, Card, TextField, Container, } from '@mui/material';
import { RiSteering2Fill } from "react-icons/ri";
import { addPassenger } from '../slices/passengerSlice';
import Payment from '../components/Payment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from '../components/Loader';

const TripScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [no, setNo] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [forms, setForms] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [seat, setSeat ] = useState(true)

    const getTextFieldStyles = () => ({
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
        '& .MuiInput-root': {
          color: 'black',
        },
      });

    const fetchData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/trips/${id}`);
            const tripData = res.data;
            setData(tripData);
            setNo(tripData.bookedSeats.length + tripData.availableSeats);
            dispatch(selectTrip(tripData));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trip:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        const newForms = selectedSeats.map((seat, index) => (
            <div key={index} className='m-5 bg-red-500 p-2 rounded-lg'>
                <div className='flex justify-between text-white'>
                    <h2 className='m-3'>Passenger {index + 1}</h2>
                    <h2 className='w-12 h-10 bg-white text-black text-center p-2 m-3 rounded-full'>S{seat + 1}</h2>
                </div>
                <div className='flex flex-wrap'>
                    <TextField 
                        label='Name' 
                        variant="outlined" 
                        className='m-2' 
                        required
                        onChange={(e) => handleInputChange(index, e, 'name')}
                        sx={getTextFieldStyles()}
                    />
                    <TextField 
                        label='Age' 
                        variant='outlined' 
                        className='m-2' 
                        type='number'
                        required
                        onChange={(e) => handleInputChange(index, e, 'age')}
                        sx={getTextFieldStyles()}
                    />
                </div>
            </div>
        ));
        setForms(newForms);
        setTotalPrice(selectedSeats.length * data?.price || 0);
    }, [selectedSeats, data]);

    const handleCheckboxClick = (index) => {
        setSelectedSeats(prevSelectedSeats => {
            const seatIndex = prevSelectedSeats.indexOf(index);
            if (seatIndex === -1) {
                return [...prevSelectedSeats, index];
            } else {
                return prevSelectedSeats.filter(seat => seat !== index);
            }
        });
    };

    const handleInputChange = (index, e, field) => {
        const { value } = e.target;
        setPassengers(prevPassengers => {
            const updatedPassengers = [...prevPassengers];
            updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
            return updatedPassengers;
        });
    };

    const handleBookTicket = (e) => {
        e.preventDefault(); 

        const passengerData = selectedSeats.map((seat, index) => ({
            name: passengers[index]?.name || '', 
            age: passengers[index]?.age || '', 
            seatNo: selectedSeats[index] + 1 
        }));
        
        dispatch(addPassenger(passengerData));
        setSeat(false)
    };

    const handleGoToSeats = () => {
        fetchData();
        setSeat(true);
        setSelectedSeats([])
    };

    return (
        <div>
            { seat && 
                <Link to={'/'}>
                    <Button variant="outlined" type='button' className='m-5 bg-black' sx={{color: 'white', borderColor: 'black', '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'gray',
                    }}}><ArrowBackIcon />Go Back</Button>
                </Link>
            }
            {loading ? (
                <div>
                    <h1><Loader /></h1>
                </div>
            ) : data ? ( seat ? (
                <div className='flex flex-wrap justify-center'>
                    <Card className='m-10 mb-16 w-72 p-2 grid'>
                        <div className='text-3xl m-2 justify-self-end mx-6'>
                            <RiSteering2Fill />
                        </div>
                        <div className="grid grid-cols-3 border-t-2 border-black">
                            {Array.from({ length: no }).map((_, index) => (
                                <div key={index} 
                                    className={`w-10 h-12 m-3 mx-6 flex items-center justify-center 
                                    border-2 border-gray-400 cursor-pointer ${selectedSeats.includes(index) ? 'bg-blue-400' : data.bookedSeats.includes(index + 1) ? 'bg-gray-400 pointer-events-none' : 'bg-green-300'}`}
                                    onClick={() => handleCheckboxClick(index)}>
                                    <input type="checkbox" className="hidden checkbox" />
                                    <span className="text-xs">S{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card className='w-auto m-10 mb-16'>
                        { selectedSeats.length ? (
                        <form onSubmit={handleBookTicket}>
                            {forms}
                            <h2 className='mx-5'>Total Price: {totalPrice}</h2>
                            <Button type='submit' variant="outlined" className='m-5 bg-black' sx={{color: 'white', borderColor: 'black', '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'gray',
                            }}}>Next</Button>
                        </form>
                        ) : (
                            <></>
                        )}
                    </Card>
                </div>
            ) : (
                <Container>
                    <Card className='p-5 m-10'>
                        <Button variant="contained" className='bg-black hover:bg-gray-400 m-3' onClick={handleGoToSeats}><ArrowBackIcon />Go to Seats</Button>
                        <Payment />
                    </Card>
                </Container>
            )
            ) : (
                <>
                <h2>Something went wrong! try again</h2>
                <Link to={'/'}>
                    <Button type='button' variant="outlined"
                        className='bg-black text-white border-white hover:bg-white hover:text-black hover:border-black m-2'>
                        Go Back
                    </Button>
                </Link>
                </>
            )}
        </div>
    );
};

export default TripScreen;
