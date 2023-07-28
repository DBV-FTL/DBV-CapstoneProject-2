import React,{useState} from 'react'
import './Sidebar.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart'

function Sidebar( {menus, setAppState, appState, isOpen, cart, services, setIsOpen}) {
    return (
        <div className={isOpen? 'open-sidebar': 'closed-sidebar'}>
                
                {isOpen &&
                <>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <i onClick={() => setIsOpen((prev)=> !prev)} className="material-icons md-36 arrow_back">arrow_back_ios</i>
                    <ShoppingCart setAppState={setAppState} appState={appState} menus= {menus} cart={cart} services={services}/>

                </>
                }
        </div>
    )
}

export default Sidebar
