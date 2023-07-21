import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <div>
        <div className='main-foot'>

            <p>
                <span className="bold">Explore</span> <br />  <br />
                About Us <br />
                <br />
                Cities <br />
                <br />
                Sitemap <br />
                <br />
                Slay <br />
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
                Login <br />
                <br />
                Register <br />
                <br />
                Account Setting<br />
                <br />
                My Orders <br />
                <br />
            </p>
            <p>
                <span className="bold">Socials</span> <br />
                {/* About Us <br /> */}
                <br />
                Facebook <br />
                <br />
                Twitter <br />
                <br />
                LinkedIn<br />
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
