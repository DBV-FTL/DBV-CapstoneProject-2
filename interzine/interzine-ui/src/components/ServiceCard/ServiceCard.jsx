import React from 'react'
import './ServiceCard.css'

import { Link } from 'react-router-dom'

function ServiceCard({service}) {
    // console.log('service', service, service.id)


    return (
        <>
    
        <div className='service-card'>
        <div className='service-info'>
          <Link to={`/menu/${service?.id}`} className='service-link'>
            <img className='service-image' src={'https://furtherafrica.com/content-files/uploads/2022/07/ethiopia_food.jpg'} />
          </Link>
            <div className='service-details'>
                <div className='column'>
                <h2 className="service-name">{service?.name} </h2>
                {/* <p className='service-rating'> {service.rating}</p> */}
                <p className="service-cuisine">{service?.cuisine}</p>
                </div>
                <div className='provider-image-container'> <img className='provider-image' src={service?.profile_picture} /> </div>
            </div>
          </div>
        </div>
        </>
      );
}

export default ServiceCard
