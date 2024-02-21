import React, { useState } from 'react';
import { FormControl, TextField, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../constants';
import { toast } from 'react-toastify';
import { getTrips } from '../slices/tripSlice';
import { useGetTripsQuery } from '../slices/userApiSlice';
import Loader from './Loader';

const Search = () => {
  const [from, setFrom ] = useState('');
  const [to, setTo ] = useState('');
  const [date, setDate ] = useState('');


  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.get(`${BASE_URL}/api/trips/?from=${from}&to=${to}&date=${date}`);
      const data = await res.data
      dispatch(getTrips({...data}))
    } catch (err){
      console.log(err)
        toast.warn(err.response.data.message)
        dispatch(getTrips([]))
        console.log('Error', err.response.data)

    }
  }

  const color = grey[900];

  const getTextFieldStyles = () => ({
    '& label.Mui-focused': {
      color: color,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: color,
      },
      '&:hover fieldset': {
        borderColor: color,
      },
      '&.Mui-focused fieldset': {
        borderColor: color,
      },
    },
    '& .MuiInput-root': {
      color: 'black',
    },
  });

  return (
    <div className='flex justify-center'>
      <form className="flex flex-col lg:flex-row shadow-xl mt-28 w-auto justify-center p-5 rounded-lg bg-white" onSubmit={submitHandler}>
        {/* <TextField
          id="outlined-required"
          label="From"
          variant="outlined"
          sx={getTextFieldStyles()}
          className='mt-[8px]'
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        /> */}
        <input className=" px-4 py-2 border-b border-black outline-none  sm:block focus:border-blue-900 focus:border-b-2 mx-2 placeholder:text-black" type="text"
         value={from} 
         onChange={(e) => setFrom(e.target.value)}
         placeholder="From"
         required />
        {/* <TextField
          id="outlined-required"
          label="To"
          variant="outlined"
          sx={getTextFieldStyles()}
          className='mt-[8px]'
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        /> */}
        <input type="text" className="px-4 py-2 border-b border-black outline-none md:block focus:border-blue-900 focus:border-b-2 mx-2 placeholder:text-black" 
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To" required />
        {/* <TextField 
          id='outline-required'
          variant='outlined'
          sx={getTextFieldStyles()}
          className='mt-[8px]'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type='date'
          format="yyyy-mm-dd"
          required
        /> */}
        <input type="date" className="px-4 py-2 border-b border-black outline-none md:block focus:border-blue-900 focus:border-b-2 mx-2" 
        value={date}
        format="yyyy-mm-dd"
        onChange={(e) => setDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        placeholder="Date" required />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} >
          <DatePicker
          label="Date"
          slotProps={{ textField: { variant: 'outlined', sx: getTextFieldStyles(), } }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
          </DemoContainer>
        </LocalizationProvider> */}
        {/* <button class="bg-gray-400 hover:bg-gray-500 text-white font-bold px-4 rounded text-center mt-[8px]">
          Search
        </button> */}
        <Button type='submit' variant="outlined" className='bg-black px-5' sx={{color: 'white', borderColor: 'black', '&:hover': {
          borderColor: 'black',
          backgroundColor: 'gray',
        }}}>Search</Button>
      </form>
      {/* <Loader /> */}
    </div>
  );
}

export default Search;
