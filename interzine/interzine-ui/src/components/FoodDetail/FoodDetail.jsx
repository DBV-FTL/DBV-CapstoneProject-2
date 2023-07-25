import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import './FoodDetail.css'
import apiClient from '../../services/apiClient'

function FoodDetail({appState, setAppState}) {
    //cart is an array of objects where food id is mapped to quantity
    function handleIncrement(){
        setAppState((prev) => {
            // return {...prev, prev?.cart}
        })
    }

    const {id} = useParams()
    console.log('at food deets',id)
    const [food, setFood]= useState()


    useEffect(() => {
        // console.log('in useEffect')
        apiClient.fetchMenuItem(id).then((response) => {
            // console.log('response fooddetail', id, response.data)
            setFood(response?.data.menuItem)
        })
    }, [])

    return (
        <div className='food-detail'>
            
            
            <button> x </button>
            <img src={food?.image_url}/>
            <div className='details'>
            <h1> {food?.name} </h1>
            <p> {food?.cost} </p>
            <p> {food?.rating} </p>
            <p> all about this food! </p>
            <button> - </button>
            <p> 1 </p>
            <button> + </button>
            <button> Add to cart- $$</button>
            </div>
           
            {/* need description also */}
            {/* WORKING ON MAKING THIS A MODAL */}
        </div>
    )
}

export default FoodDetail
