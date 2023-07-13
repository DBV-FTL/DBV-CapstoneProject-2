import React from 'react'
import ServicesGrid from '../../components/ServicesGrid/ServicesGrid'

function Shop({services}) {
    return (
        <div className='services-grid'>
            <ServicesGrid services={services}/>
        </div>
    )
}

export default Shop
