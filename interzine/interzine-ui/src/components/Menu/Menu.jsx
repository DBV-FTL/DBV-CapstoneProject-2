import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import FoodCard from '../FoodCard/FoodCard'
import './Menu.css'
import ServiceHero from '../ServiceHero/ServiceHero'
import apiClient from '../../services/apiClient'

function Menu(props) {
    console.log('hi')
    let menu
    
    if (props.menu){
        menu= props.menu
        

        
    } else {
        const [userMenu, setUserMenu] = useState()
        const {id} = useParams()


        useEffect(()=>{

            apiClient.fetchMenuItems(id).then((response) => {
                setUserMenu(response?.data?.menuItems)
                props.setMenus((prev) => prev.concat(response?.data?.menuItems))
            })
        }, [])
        menu = userMenu

    }

    return (
        <>
        <ServiceHero /> 
        
        <div className='menu'>
           
            {
                menu?.map(food=> <FoodCard  food={food}/>)
            }
        </div>
        </>
    )
    
}

export default Menu
