import React,{useState} from 'react'
import './Register.css'
import apiClient from '../../services/apiClient'

function Register({register, appState}) {
    const [user, setUser]= useState({})
    console.log('u',user, appState)

    function handleFormInput(e) {
        const name = e.target.name
        const value = e.target.value
        setUser({...user, [name]:value})
    }

    async function handleRegister(e) {
        e.preventDefault()
        register({...appState, user: user})
        await apiClient.signupUser(user)
        console.log('logged in')
    }

    return (
        <div className='register'>
            <form>
                <input onChange={(e) => handleFormInput(e)} name='first_name' placeholder='First Name' required/>
                <input onChange={(e) => handleFormInput(e)} name='last_name' placeholder='Last Name' required/>
                <input onChange={(e) => handleFormInput(e)} name='username' placeholder=' Username' required/>
                <input onChange={(e) => handleFormInput(e)} name='email' placeholder='Email' required/>
                <input onChange={(e) => handleFormInput(e)} name='password' placeholder='Password' required/>
                <button onClick={async (e) => await handleRegister(e)}> Sign up </button>
            </form>
        </div>
    )
}

export default Register
