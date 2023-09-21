import React from 'react'
import '../Styles/app.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Principal = () => {
  return (
    <div>
      <Navbar/>
        <div className="flex flex-col items-center justify-center items-start h-screen">
          <h5 className='font-bold'>Ver que ideas podemos poner acá</h5>
        </div>
        <Footer/>
    </div>
  )
}

export default Principal;
