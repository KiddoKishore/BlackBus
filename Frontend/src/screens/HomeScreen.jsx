import React from 'react';
import Search from '../components/Search';
import Trips from '../components/Trips';

const HomeScreen = () => {
  return (
    <div>
      <h1 className='text-center text-cyan-50/75 text-5xl p-5'>Welcome To Black Bus</h1>
      <Search />
      <div className='bg-white mb-20'>
        <Trips />
      </div>
    </div>
  )
}

export default HomeScreen