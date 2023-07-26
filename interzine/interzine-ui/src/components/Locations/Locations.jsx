import React from 'react'
import './Locations.css'
import GoogleMaps from '../GoogleMaps/GoogleMaps'

function Locations() {
  return (
    <>
      <p className='mheader'> Find International Cuisines near you! </p>
      <h5 className='subhead'> Your Síneer may be right next door!</h5>
      <p id="contact-header">Contact</p>
      <div className="contact" >


        <p className='state'> Map API slay meant to be here </p>
        <p className='mapsl'>
          <GoogleMaps />
        </p>

      </div>
    </>
  )
}

export default Locations
