import React from 'react'
import './ServiceCard.css'
import { Link } from 'react-router-dom'

function ServiceCard({service}) {
    console.log('service', service, service.id)


    return (
        <div className='service-card'>

            <Link to={`/menu/${service.id}`}>
                <img className='service-image' src={'https://furtherafrica.com/content-files/uploads/2022/07/ethiopia_food.jpg'}/>
            </Link>
            <div>
                <h2 className= "servicenm"> {service.name} || {service.cost} </h2>
                <h2 className= "servicenm"> {service.cuisine} || {service.rating} </h2>
                <img className='provider-image' src={service.profile_picture}/>

            </div>
        </div>
    )
}

export default ServiceCard
