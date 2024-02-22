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
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <img src={BlackBus} alt='Black-Bus' className='fixed w-full -z-10'/>
        <Header />
        <main style={{ paddingBottom: '100px' }}>
          <Outlet />
        </main>
        <Footer style={{ position: 'absolute', bottom: 0, width: '100%' }} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
