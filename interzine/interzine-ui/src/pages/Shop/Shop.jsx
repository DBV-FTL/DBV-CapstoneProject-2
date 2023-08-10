import React from 'react'
import ServicesGrid from '../../components/ServicesGrid/ServicesGrid'
import CuisineCategory from '../../components/CuisineCategory/CuisineCategory'
import './Shop.css'

function Shop({services, menus, setMenus}) {
    return (
        <div className='shop'>
            
            <ServicesGrid services={services} setMenus={setMenus} />
        </div>
    )
}

export default Shop
