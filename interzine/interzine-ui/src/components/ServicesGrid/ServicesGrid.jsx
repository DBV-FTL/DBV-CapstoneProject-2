import React, {useState} from 'react'
import ServiceCard from '../ServiceCard/ServiceCard'
import {Link} from 'react-router-dom'
import './ServicesGrid.css'
import SubNavbar from '../SubNavbar/SubNavbar'
import Bot from '../Bot/Bot'
import ServiceHero from '../ServiceHero/ServiceHero'
    
function ServicesGrid({services}) {
    const [servicesShown, setServicesShown] = useState(services)
    const [showChatBot, setShowChatBot] = useState(false);
    const handleToggleChatBot = () => {
        setShowChatBot((prevShowChatBot) => !prevShowChatBot);

    }


    return (
        // <div>
        //     <SubNavbar services={servicesShown} setServices={setServicesShown}/>
        //     <div className='service-grid'>
        //         {servicesShown?.map(service => <div className='card'> <ServiceCard id= {service.id} service={service}/> </div>)}
        //     </div>

        // </div>
        <>

              <ServiceHero />
        <SubNavbar services={servicesShown} setServices={setServicesShown}/>
            <div className='service-grid'>
                {servicesShown?.map(service => <div className='card'> <ServiceCard id= {service.id} service={service}/> </div>)}
            </div>

           <div className='chat'>
             <div className='image-container'>
             {showChatBot ? <Bot /> : null} 
              <img
                  src='bot.png'
                  alt=''
                  className='bot-img'
                  onClick={handleToggleChatBot}
                />
          </div>
          
          
          </div>
              
        </>
    )
}

export default ServicesGrid
