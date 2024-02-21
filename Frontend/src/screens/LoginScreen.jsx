import React from 'react';
import { TextField, Button, Link } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useLoginMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const color = grey[900];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(BASE_URL)
    try {
      // console.log(email, password)
      const res = await login({ email, password }).unwrap();
      console.log(res)
      dispatch(setCredentials({...res}));
      toast.success('Login successfull!');
      navigate('/')
      return res;
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error)
      return null;
    }
}

  const getTextFieldStyles = () => ({
    '& label.Mui-focused': {
      color: color,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: color,
    },
    '& .MuiInput-root': {
      color: 'black',
    },
  });

  return (
    <div className='m-5'>
      <form onSubmit={submitHandler}>
        <div className='grid grid-cols-1 w-96 gap-5 m-auto bg-black/50 p-10 rounded'>
          <h1 className='text-center text-white text-xl'>Sign In</h1>
            <TextField id='standard-required' label='Email' type='email' variant='standard' value={email} onChange={(e) => setEmail(e.target.value)} sx={getTextFieldStyles()} />
            <TextField id='standard-required' label='Password' type='password' variant='standard' value={password} onChange={(e) => setPassword(e.target.value)} sx={getTextFieldStyles()} />
            <Button type='submit' variant='contained' sx={{ '&:hover': { backgroundColor: 'white', color: 'black'}}} className='w-5 bg-black px-2 px-4 py-2 font-bold my-5'>Submit</Button>
          <p className='text-white'>Create a New Account - <Link href='/register'>Click Here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;

