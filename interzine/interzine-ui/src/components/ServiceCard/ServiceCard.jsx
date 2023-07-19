import React from 'react'
import './ServiceCard.css'

function ServiceCard({service}) {
    return (
        <div className='service-card'>
            <img className='service-image' src={service.image_url}/>
            <div>
                <h2> {service.name} || {service.cost} </h2>
                <span> {service.rating} </span>
            </div>
        </div>
    )
}

export default ServiceCard
