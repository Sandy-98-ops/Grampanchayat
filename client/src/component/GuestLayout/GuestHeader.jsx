import React from 'react'
import logo from '../logo.png';
import gm from '../gm.png';
const GuestHeader = () => {
  return (
    <div className='image'>
      
            <img 
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Logo"
            />

<div className='img'>
<img 
              src={gm}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Logo"
            />
</div>

          
      <h1>E-Gram Panchayat</h1>
    </div>
    
  )
}

export default GuestHeader
