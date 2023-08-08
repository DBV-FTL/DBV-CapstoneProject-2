import React,{useState}  from 'react'
import ServiceHero from '../../components/ServiceHero/ServiceHero'
import AddNewItem from '../AddNewItem/AddNewItem'
import Menu from '../../components/Menu/Menu'
import './Store.css'

function Store({appState, updateMenu}) {
    const [addNewItem, setAddNewItem] = useState(false)

    return (
        <div>
            <ServiceHero/>
            {
                addNewItem?
            <AddNewItem appState={appState} updateMenu={updateMenu} setAddNewItem={setAddNewItem}/>
                : 
            <div className='button-container'>
                <button className= 'add-button' onClick={()=> setAddNewItem(true)}> Add to menu </button>
                <Menu menu={appState.menuItems}/>

            </div>
            }
        </div>
    )
}

export default Store
