import React from 'react'
import ServicesGrid from '../../components/ServicesGrid/ServicesGrid'
import CuisineCategory from '../../components/CuisineCategory/CuisineCategory'
import './Shop.css'

function Shop({services}) {
    return (
        <div className='shop'>
            <CuisineCategory/>
            <ServicesGrid services={services}/>
        </div>
    )
}

export default Shop
