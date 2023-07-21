import React from 'react'
import ServicesGrid from '../../components/ServicesGrid/ServicesGrid'
import CuisineCategory from '../../components/CuisineCategory/CuisineCategory'

function Shop({services}) {
    return (
        <div className='services-grid'>
            <CuisineCategory/>
            <ServicesGrid services={services}/>
        </div>
    )
}

export default Shop
