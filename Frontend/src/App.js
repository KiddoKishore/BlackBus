import React from 'react';
import Header from './components/Header';
import BlackBus from './assets/images/BlackBus.jpg';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <img src={BlackBus} alt='Black-Bus'className='fixed w-full -z-10'/>
      <Header />
      <main>
          <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
