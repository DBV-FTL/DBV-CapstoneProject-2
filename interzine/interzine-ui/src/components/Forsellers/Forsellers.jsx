import React, { useEffect } from "react"
import { useState } from "react";
import './Forsellers.css'

export default function Forsellers() {
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const servicesElement = document.querySelector('.mediatiles');
            const bounding = servicesElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (bounding.top < windowHeight) {
                setAnimate(true);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);


// "mediatiles" style={{ display:animate? 'block' : 'none'}}

return (
    <>
    <h4 className="head"> Sellers, Rejoice </h4>
    <h5 className='subhead'> One of the reasons we started Intersínee was to give you easier access to customers. Here's how we do it!</h5>
    <div className='mediatiles'>
        {/* <div className='trial-2' style={{ display:animate? '' : 'none'}} > */}
        <div>
            {<img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/88d55f7112efe55f.webp" alt="" className="tile-img" width="450" height="350" ></img>}
            <h5 className='img-sub'> Feed your Sínee </h5>
        </div>
        <div>
            {<img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/711d51ca1b458931.webp" alt="" className="tile-img" width="450" height="350" ></img>}
            <h5 className='img-sub'> Lookout for cuisine inspo! </h5>
        </div>
        <div>
            {<img src="https://www.efoodcard.com/images/waitress.jpg" alt="" className="tile-img" width="450" height="350" ></img>}
            <h5 className='img-sub'> Submit Certification </h5>
        </div>
        {/* </div> */}
    </div>
    </>
)
}