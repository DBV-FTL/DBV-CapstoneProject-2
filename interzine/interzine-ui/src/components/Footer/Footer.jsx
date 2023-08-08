import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div>
        <div className='main-foot'>

            <p>
                <span className="bold">Explore</span> <br />  <br />
                <a href="/aboutus">About us</a> <br />
                <br />
                Cities <br />
                <br />
            </p>
            
            <p>

                <span className="bold">Support</span>  <br />
                {/* About Us <br /> */}
                <br />
                Contact Us <br />
                <br />
                Money Refund <br />
                <br />
                Order Status <br />
                <br />
                Shipping Info <br />
                <br />
            </p>
            <p>
                <span className="bold">Account</span> <br />
                {/* About Us <br /> */}
                <br />
                <a href="/login">Login</a><br />
                <br />
                <a href="/register">Register</a><br />
                <br />
                My Orders <br />
                <br />
            </p>
           
            
            
        </div>
        <div className='row'>
                <p className='col-sm'>
                    &copy;{new Date().getFullYear()} Intersínee | All right reserved | Terms of Service | Privacy
                </p>
            </div>
        </div>

    )
}

export default Footer
