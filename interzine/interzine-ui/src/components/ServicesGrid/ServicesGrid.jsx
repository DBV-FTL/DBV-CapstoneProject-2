import React from 'react'
import ServiceCard from '../ServiceCard/ServiceCard'
import {Link} from 'react-router-dom'
import './ServicesGrid.css'

function ServicesGrid({services}) {
    return (
        <div className='service-grid'>
            {services?.map(service => <div className='card'> <ServiceCard id= {service.id} service={service}/> </div>)}
        </div>
    )
}

export default ServicesGrid
