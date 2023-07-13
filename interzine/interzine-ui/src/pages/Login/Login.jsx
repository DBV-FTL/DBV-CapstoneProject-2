import React, {useState} from 'react'
import axios from 'axios'
import apiClient from "../../services/apiClient"


function Login({login, appState}) {
    const [formInput, setFormInput] = useState({})


    function handleFormInput(e) {
        const name= e.target.name
        const value= e.target.value
        setUser({...formInput, [name]: value})
    }

    async function handleLogin(e) {
        e.preventDefault()
        const user= await apiClient.loginUser(formInput)
        login({...appState, user: user})
    }

    //set appstate from here
    return (
        <div>
           <form>
            <input onChange= {(e) => handleFormInput(e)} name='email' placeholder='email' required/>
            <input onChange= {(e) => handleFormInput(e)} name='password' placeholder='password' required/>
            <button onClick={async (e) => await handleLogin(e)} > Log in </button>
            </form> 
        </div>
    )
}

export default Login
