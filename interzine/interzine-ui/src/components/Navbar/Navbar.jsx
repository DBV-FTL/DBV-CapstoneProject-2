import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import apiClient from '../../services/apiClient'

function Navbar({ appState, logout, setIsOpen }) {
    const navigate = useNavigate()

    function routeToLogin() {
        navigate('/login')
    }

    async function routeToLogout() {
        await apiClient.logoutUser()
        logout({ ...appState, isAuthenticated: false })
        navigate('/')
    }

    function routeToRegister() {
        navigate('/register')
    }

    return (
        <>
        <nav className='topnavbar'>
            <div className="cart">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <i onClick={() => setIsOpen((prev)=> !prev)} className="material-icons md-36">add_shopping_cart</i>
            </div>
            <ul>
                <li><Link to="/for-sellers">For Sellers</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/locations">Locations</Link></li>
            </ul>

            <div className='logo-and-location'>
            <Link to='/'> <p className='header'>Inter<strong className='z'>Sínee</strong></p> </Link>
            <h6> by DB & V </h6>

               
            </div>

            {
                appState.isAuthenticated ? <button onClick={routeToLogout} > Log Out</button> :
                    <div className='access-buttons'>
                        <button className="access-button1" onClick={routeToLogin}> Log In</button>
                        <button className="access-button2" onClick={routeToRegister}> Sign Up</button>
                    </div>
            }


        </nav >
        </>
    )
}

export default Navbar
