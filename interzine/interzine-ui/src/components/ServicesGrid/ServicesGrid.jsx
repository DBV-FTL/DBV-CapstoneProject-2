import React from 'react'
import ServiceCard from '../ServiceCard/ServiceCard'
import {Link} from 'react-router-dom'
import './ServicesGrid.css'

function ServicesGrid({services}) {
    return (
        <div className='service-grid'>
            {/* <Link to='/menu/8'> <p> hi </p></Link> */}
            {services?.map(service => <div className='card'> <ServiceCard id= {service.id} service={service}/> </div>)}
        </div>
    )
}

export default ServicesGrid
