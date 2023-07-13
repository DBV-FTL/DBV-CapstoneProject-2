import React from 'react'
import './ServiceCard.css'

function ServiceCard({service}) {
    return (
        <div className='service-card'>
            <img src={service.url}/>
            <div>
                <h2> {service.name} </h2>
                <span> {service.ratings} </span>
            </div>
        </div>
    )
}

export default ServiceCard
