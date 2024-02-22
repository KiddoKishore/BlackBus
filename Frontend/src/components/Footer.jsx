import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='text-center bottom-0 mb-0 w-full backdrop-blur text-white p-5 mt-5' style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
        <p>BlackBus &copy; {currentYear}</p>
    </div>
  )
}

export default Footer