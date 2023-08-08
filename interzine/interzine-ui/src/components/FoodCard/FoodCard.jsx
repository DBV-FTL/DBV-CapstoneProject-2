import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './FoodCard.css'
import FoodDetail from '../FoodDetail/FoodDetail'

function FoodCard({food, setShowModal}) {
    const navigate= useNavigate()
    

    function openModal(e){
        e.preventDefault()
        console.log('open')
        // navigate(`/shop/food/${food.id}`)
        // return <FoodDetail food={food}/>
    }


    return (
        <div className='food-card'>
            <Link to={`/food/${food.id}`}> <img className='food-image' src={food.image_url} /> </Link>
            <div>
                <div className='FCname'>
                <h3> {food.name} </h3>
                </div>
                <h4> ${parseInt(food.cost).toFixed(2)} </h4>
            </div>
            {/* <FoodDetail food={food} setShowModal={setShowModal}/> */}
            
        </div>
    )
}

export default FoodCard
