import React from 'react';
import './ServiceHero.css';

function ServiceHero({provider, client}) {

    function updateProviderDetails(){

    } 

  return (
    <div className='service-hero-section'>
        <img className='hero-image' src='https://cms-b-assets.familysearch.org/dims4/default/bf2d93e/2147483647/strip/true/crop/800x500+0+0/resize/2480x1550!/format/webp/quality/90/?url=https%3A%2F%2Ffamilysearch-brightspot.s3.amazonaws.com%2F89%2F3f%2F1a23c4a6fe52a96d2a6d2586cb90%2Fworld-cuisine.jpg'/>
        <div className='details-edit'>
            <div className='img-details'>
                <div> <img className='provider_profile_picture' src={provider?.profile_picture}/> </div>
                <div className='provider-details'>
                    <h1> {provider?.name} </h1>
                    <p className='cuisine-name'> {provider?.cuisine} </p>
                    <p className='blurb'> {provider?.blurb ? provider?.blurb: `Explore ${provider?.cuisine} cuisine from Sineer ${provider?.name}!`}</p>
                    
                </div>
            </div>
            {
                client==='provider' &&
                <div className='edit'>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined pen">
                pen_size_4
                </span>
                </div>
            }
            </div>
            
        
    </div>
  );
}

export default ServiceHero;