import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import './FoodDetail.css'
import apiClient from '../../services/apiClient'

function FoodDetail({cart, addToCart}) {

    //cart is object where food id is mapped to quantity
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
            
            // (prev) => {
            // return {...prev, cart: {...prev.cart, [id]: prev.cart[id] + 1}}
        // }
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
        // setAppState((prev) => {
        //     return {...prev, cart: {...prev.cart, [id]: prev.cart[id] - 1}}
        // })
    }

    console.log('at food deets',id)
    const [food, setFood]= useState()

   


    useEffect(() => {
        // console.log('in useEffect')
        apiClient.fetchMenuItem(id).then((response) => {
            // console.log('response fooddetail', id, response.data)
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
            <p> {cart[id]} </p>
            <button onClick= {handleIncrement}> + </button>
            <button> Add to cart- $$</button>
            </div>
           
            {/* need description also */}
            {/* WORKING ON MAKING THIS A MODAL */}
        </div>
    )
}

export default FoodDetail
