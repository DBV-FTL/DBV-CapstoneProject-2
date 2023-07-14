import React,{useState} from 'react'
import './Sidebar.css'

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="sidebar">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

            {/* <div className='m'>
            <i onClick= {setIsOpen} className="material-icons md-36">arrow_forward</i>
            </div> */}
            {/* <div >
            <i onClick= {() => setIsOpen(true)} className="material-icons md-36">add_shopping_cart</i>
            </div> */}
            {/* <div>
            <i onClick= {setIsOpen} className="material-icons md-36">monetization_on</i>
            </div>
            <div>
            <i onClick= {setIsOpen} className="material-icons md-36">fact_check</i>
            </div> */}
        </div>
    )
}

export default Sidebar
