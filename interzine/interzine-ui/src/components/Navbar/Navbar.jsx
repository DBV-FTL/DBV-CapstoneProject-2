import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../services/apiClient'

function Navbar({appState, logout}) {
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

    return (
        <nav>
            <div className='logo-and-location'>
                <h2> InterZine </h2>
                
                <form>
                    <input placeholder='Zip Code'/>
                </form>
            </div>

            
                {
                    appState.isAuthenticated ?
                    <button onClick={routeToLogout} > Log out </button>
                    :
                    <div className='access-buttons'>
                        <button onClick={routeToLogin} > Log in </button>
                        <button onClick={routeToRegister}> Sign up </button>
                    </div>
                }
                
            
            

        </nav>
    )
}

export default Navbar
