import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import FoodCard from '../FoodCard/FoodCard'
import apiClient from '../../services/apiClient'

function Menu(props) {
//   const [showModal, setShowModal]= useState(false) //want food details to be a modal
    console.log('hi')
    let menu
    
    if (props.menu){
        menu= props.menu
        

        
    } else {
        const [userMenu, setUserMenu] = useState()
        const {id} = useParams()


        useEffect(()=>{

            apiClient.fetchMenuItems(id).then((response) => {
                setUserMenu(response.data.menuItems)
            })
        }, [])
        menu = userMenu

    }

    return (
        <div className='menu'>
            
            {
                menu?.map(food=> <FoodCard  food={food}/>) //setShowModal= {setShowModal}
            }
        </div>
    )
    
}

export default Menu
