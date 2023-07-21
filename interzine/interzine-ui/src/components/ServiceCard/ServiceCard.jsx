import React from 'react'
import './ServiceCard.css'
import { Link } from 'react-router-dom'

function ServiceCard({service}) {

    async function handleClick(e){
        e.preventDefault()
    }

    return (
        <div className='service-card'>
            <Link onClick={(e) => handleClick(e)} to={`${service.id}`}>
                <img className='service-image' src={service.image}/>
            </Link>
            <div>
                <h2> {service.name} || {service.cost} </h2>
                <h2> {service.cuisine} || {service.rating} </h2>
                <img className='provider-image' src={service.profile_picture}/>

                {/* <span> {service.rating} </span> */}
            </div>
        </div>
    )
}

export default ServiceCard
