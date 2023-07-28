import React from 'react'
import ServiceCard from '../ServiceCard/ServiceCard'
import {Link} from 'react-router-dom'
import Bot from '../Bot/Bot'
import './ServicesGrid.css'
import ServiceHero from '../ServiceHero/ServiceHero'

function ServicesGrid({services}) {
    return (
        <>
        <ServiceHero/>
        <div className='service-grid'>
            {/* <Link to='/menu/8'> <p> hi </p></Link> */}
            
            {services?.map(service => <div className='card'> <ServiceCard id= {service.id} service={service}/> </div>)}
        </div>
        </>
    )
}

export default ServicesGrid
