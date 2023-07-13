import React, {useState} from 'react'
import axios from 'axios'
import apiClient from "../../services/apiClient"
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


function Login({login, appState}) {
    const [formInput, setFormInput] = useState({})
    const navigate= useNavigate()

    function handleFormInput(e) {
        const name= e.target.name
        const value= e.target.value
        setFormInput({...formInput, [name]: value})
    }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response= await apiClient.loginUser(formInput)
            const data = response.data;
            console.log('old user logged in', response)
            
            if (response.status === 200) {
              const { token } = data;
              localStorage.setItem("interzine_token", token);
      
              const decodedToken = jwtDecode(token); //a way to get username from token
              login({...appState, user: decodedToken, isAuthenticated: true})
              navigate('/')
              
            } else {
            //   //Login failed
            //   setLoginError(data.message);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        // const user= 
        // login({...appState, user: user})
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
