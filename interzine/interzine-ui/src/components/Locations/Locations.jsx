import React from 'react'
import './Locations.css'
import GoogleMaps from '../GoogleMaps/GoogleMaps'

function Locations() {
  return (
    <>
  
      <p id="contact-header">Contact </p>
      
      <div className="location" >       
      <p className='state'> Find International Cuisines near you! </p>
      <p className='statehd'> Your Síneer may be right next door!</p>
          <GoogleMaps />
      </div>
      
    </>
  )
}

export default Locations
