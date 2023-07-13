import React from 'react'
import './FoodCard.css'

function FoodCard({food}) {
    return (
        <div className='food-card'>
            <img src={food.url} />
            <span>
                <h3> {food.name} </h3>
                <h3> ${food.cost.toFixed(2)} </h3>
            </span>
            
        </div>
    )
}

export default FoodCard
