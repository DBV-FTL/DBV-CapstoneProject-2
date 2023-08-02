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
            
           
            {/* <button onClick={routeToMenu}> x </button> */}
            <img src={food?.image_url}/>
            <div className='details'>
                <div className='sub'>
            {/* <h1> {food?.name} </h1> */}
            <p> ${food?.cost} </p>
            <p> ⭐{food?.rating} </p>
            <p> Jollof Rice! </p>
            </div>
            <div className='pic-det'>
            <p> {id in cart? cart[id] : 0} </p>
            <button onClick={handleDecrement}> - </button><button className='fdbtn' onClick= {handleIncrement}> + </button>
            </div>
            
            <button> Add to cart- $$</button>
            </div>
           
        </div>
    )
}

export default FoodDetail
