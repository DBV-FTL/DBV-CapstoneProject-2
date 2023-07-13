import React from 'react'
import ServiceCard from '../ServiceCard/ServiceCard'

function ServicesGrid({services}) {
    return (
        <div className='service-grid'>
            {services.map(service => <ServiceCard id= {service.id} service={service}/>)}
        </div>
    )
}

export default ServicesGrid
