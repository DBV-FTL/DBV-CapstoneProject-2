import React from 'react'
import FoodCard from '../FoodCard/FoodCard'

function Menu({menu}) {
    return (
        <div className='menu'>

            
            {
                menu.map(food=> <FoodCard food={food}/>)
            }
        </div>
    )
}

export default Menu
