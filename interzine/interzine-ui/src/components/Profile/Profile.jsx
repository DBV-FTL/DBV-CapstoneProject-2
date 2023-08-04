import React from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom'


function Profile({viewProfile, setViewProfile}) {
    const navigate= useNavigate()
    console.log('showing profile')

    function handleMouseOver() {
        console.log('show')
        setViewProfile(true)
    }

    function handleMouseOut() {
        console.log('hide in profile')
        setViewProfile(false)

    }
    return (
        <div >
            {
                viewProfile&&
                <div className='profile' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    <p> Account </p>
                    <p onClick={()=> navigate('/orders')}> Orders </p>
                </div>
                
            }
            
            
        </div>
    )
}

export default Profile
