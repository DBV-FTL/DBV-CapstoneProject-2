import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/apiClient'
import Profile from '../Profile/Profile'

function Navbar({appState, logout}) {
    const [isOpen, setIsOpen, setViewProfile] = useState(false)
    const navigate= useNavigate()

    function routeToLogin() {
        navigate('/login')
    }

    async function routeToLogout() {
        await apiClient.logoutUser()
        logout({...appState, isAuthenticated: false})
        navigate('/')
    }

    function routeToRegister() {
        navigate('/register')
    }

    function handleMouseOver() {
        console.log('show')
        setViewProfile(true)
    }

    function handleMouseOut() {
        console.log('hide')
        // setViewProfile(false)

    }

    return (
        <nav>
            <div className="cart">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <i onClick={() => setIsOpen(true)} className="material-icons md-36">add_shopping_cart</i>
            </div>

            <div className='logo-and-location'>
            <p className='header'>Inter<strong class='z'>Zine</strong></p>

                {/* <form>
                    <input placeholder='Zip Code' />
                </form> */}
            </div>

            {
                appState.isAuthenticated ?
                <div>
                    <button onClick={routeToLogout} > Log Out</button> 
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                    <span onMouseOver={handleMouseOver} onMouseLeave={()=>console.log('left')} onMouseOut={handleMouseOut} class="material-symbols-outlined">
                        account_circle
                    </span>
                </div> 
                
                :
                    <div className='access-buttons'>
                        <button className="access-button1" onClick={routeToLogin}> Log In</button>
                        <button className="access-button2" onClick={routeToRegister}> Sign Up</button>
                    </div>
            }
            

        </nav >
    )
}

export default Navbar
