import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import './FoodDetail.css'
import apiClient from '../../services/apiClient'

function FoodDetail({cart, addToCart}) {

    const navigate= useNavigate()

    

    const {id} = useParams()

    function handleIncrement() {

        addToCart((prev)=> {
            if ((id in cart)){
                console.log('food quantity', cart[id])
                return {...prev, cart: {...cart, [id]: cart[id] + 1}}
                
            } else{ 
                return {...prev, cart: {...cart, [id]: 1}}
            }

        }
          
        )
    }

    function handleDecrement(){
        addToCart((prev)=> {
            if ((id in cart)){
                console.log('food quantity', cart[id])
                return {...prev, cart: {...cart, [id]: cart[id] - 1}}
                
            } else{ 
                return {...prev, cart: {...cart, [id]: 1}}
            }

        }
        )
       
    }

    console.log('at food deets',id)
    const [food, setFood]= useState()

   


    useEffect(() => {
        apiClient.fetchMenuItem(id).then((response) => {
            setFood(response?.data.menuItem)
        })
    }, [])

    function routeToMenu() {
        navigate(`/menu/${food?.service_provider_id}`)
    }

    return (
        <div className='food-detail'>
            
            
            <button onClick={routeToMenu}> x </button>
            <img src={food?.image_url}/>
            <div className='details'>
            <h1> {food?.name} </h1>
            <p> {food?.cost} </p>
            <p> {food?.rating} </p>
            <p> all about this food! </p>
            <button onClick={handleDecrement}> - </button>
            <p> {id? cart[id] : 0} </p>
            <button onClick= {handleIncrement}> + </button>
            <button> Add to cart- $$</button>
            </div>
           
        </div>
    )
}

export default FoodDetail
