import React,{useState} from 'react'
import './Register.css'
import apiClient from '../../services/apiClient'
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

function Register({client, setClient, register, appState}) {
    const [formInput, setFormInput]= useState({})
    const navigate= useNavigate()


    function handleFormInput(e) {
        const name = e.target.name
        const value = e.target.value
        setFormInput({...formInput, [name]:value})
    }

    async function handleRegister(e) {
        e.preventDefault()
        console.log('registered',formInput, appState)


        try {
            let response

            if (client==='user'){
                response= await apiClient.signupUser(formInput)
            } else if (client==='provider'){
                response= await apiClient.signupProvider(formInput)
            menu= await apiClient.fetchMenuItems(response.data.provider.id)

            }
            const data = response.data;
            
            if (response.status === 201) {
              const { token } = data;
              localStorage.setItem("interzine_token", token);
              apiClient.setToken(token)
              const decodedToken = jwtDecode(token); //a way to get username from token

              if (client==='user'){
                register({...appState, user: decodedToken, isAuthenticated: true})
               } else if (client==='provider'){
                register({...appState, provider: decodedToken, isAuthenticated: true, menuItems: menu.data.menuItems})
               }
               
              navigate('/')
            } else {
            //   //Login failed
            //   setLoginError(data.message);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        
          setFormInput({})

    }

    function changeClient(client){
        if (client==='user'){
          setClient('provider')
        } else if (client==='provider'){
          setClient('user')
        }
      }
  
    let optionMessage
    if (client==='user'){
    optionMessage= 'Sign up to be a Ziner'
    } else if (client==='provider'){
    optionMessage= 'Sign up to order'
    }
    // console.log('u',formInput, appState)
  

    return (
        <div className='register'>
            {
                client==='user'?
                <div className='register-user'>
                    <form>
                        <input onChange={(e) => handleFormInput(e)} name='firstName' placeholder='First Name' required/>
                        <input onChange={(e) => handleFormInput(e)} name='lastName' placeholder='Last Name' required/>
                        <input onChange={(e) => handleFormInput(e)} name='username' placeholder=' Username' required/>
                        <input onChange={(e) => handleFormInput(e)} name='email' placeholder='Email' required/>
                        <input onChange={(e) => handleFormInput(e)} name='password' placeholder='Password' required/>
                        <input onChange={(e) => handleFormInput(e)} name='zip_code' placeholder='Zip Code' type='number' required/>
                        <button onClick={async (e) => await handleRegister(e)}> Sign up </button>
                    </form>
                    <p onClick={() => changeClient(client)}> {optionMessage} </p>
                </div> :
                <div className='register-provider'> 
                    <form>
                        <input onChange={(e) => handleFormInput(e)} name='name' placeholder='Name' required/>
                        <input onChange={(e) => handleFormInput(e)} name='cuisine' placeholder='Cuisine' required/>
                        <input onChange={(e) => handleFormInput(e)} name='email' placeholder='Email' required/>
                        <form action="/action_page.php">
                            <input name='profile-picture' type="file" id="myFile" />
                            {/* <input type="submit"/> */}
                        </form>


                        <label> Share address to all users: </label>
                        <select name='share_location'>
                            
                            <option value=''> Select</option>
                            <option value={false}> No </option>
                            <option value={true}> Yes </option>

                        </select>
                        <input onChange={(e) => handleFormInput(e)}  name='profile_picture' placeholder='img url' required/>
                        <input onChange={(e) => handleFormInput(e)} name='password' placeholder='Password' required/>
                        <input onChange={(e) => handleFormInput(e)} name='zip_code' placeholder='Zip Code' type='number' required/>
                        <button onClick={async (e) => await handleRegister(e)}> Sign up </button>
                    </form>
                    <p onClick={() => changeClient(client)}> {optionMessage} </p>
                </div>
            }
            
        </div>
    )
}

export default Register
