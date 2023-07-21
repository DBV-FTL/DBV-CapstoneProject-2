import React from 'react'
import './Hero.css'


export default function Hero({ loggedin, user }) {

    console.log(user)
    return (
        <div className="banner">
            <div>
                <img src="https://www.ulprospector.com/knowledge/wp-content/uploads/2019/11/ethnic-food-iStock-868408746-600x400.jpg" alt="banner" className="media" width="99%" height="800" ></img>
                <div className='text'>
                    <h2>
                        Intersinne
                        <span>Inter<strong className='z'>Sínee</strong></span>
                        <span>Inter<strong className='z'>Sínee</strong></span>
                        <span> <h9 className='z'>Your taste of Home.</h9><strong> Yum!🧑‍🍳</strong></span>
                    </h2>
                    {/* <span>Inter<strong className='z'>Sínne</strong></span>
                    <p> F </p> */}
                </div>
            </div>
        </div>
    )
}





