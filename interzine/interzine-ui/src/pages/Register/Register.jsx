import React,{useState} from 'react'
import './Register.css'
import apiClient from '../../services/apiClient'
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Register({register, appState}) {
    const [user, setUser]= useState({})
    const navigate= useNavigate()

    console.log('u',user, appState)

    function handleFormInput(e) {
        const name = e.target.name
        const value = e.target.value
        setUser({...user, [name]:value})
    }

    async function handleRegister(e) {
        e.preventDefault()

        try {
            const response= await apiClient.signupUser(user)
            const data = response.data;
            console.log('logged in', response)
            
            if (response.status === 201) {
              const { token } = data;
              localStorage.setItem("interzine_token", token);
      
              const decodedToken = jwtDecode(token); //a way to get username from token
              register({...appState, user: decodedToken, isAuthenticated: true})
              navigate('/')
            } else {
            //   //Login failed
            //   setLoginError(data.message);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        

    }

    return (
        <div className='register'>
            <form>
                <input onChange={(e) => handleFormInput(e)} name='firstName' placeholder='First Name' required/>
                <input onChange={(e) => handleFormInput(e)} name='lastName' placeholder='Last Name' required/>
                <input onChange={(e) => handleFormInput(e)} name='username' placeholder=' Username' required/>
                <input onChange={(e) => handleFormInput(e)} name='email' placeholder='Email' required/>
                <input onChange={(e) => handleFormInput(e)} name='password' placeholder='Password' required/>
                <input onChange={(e) => handleFormInput(e)} name='zip_code' placeholder='Zip Code' type='number' required/>
                <button onClick={async (e) => await handleRegister(e)}> Sign up </button>
            </form>
        </div>
    )
}

export default Register
