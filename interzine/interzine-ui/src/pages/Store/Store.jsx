import React from 'react'
import ServiceHero from '../../components/ServiceHero/ServiceHero'
import AddNewItem from '../AddNewItem/AddNewItem'
import Menu from '../../components/Menu/Menu'

function Store({appState, updateMenu}) {
    return (
        <div>
            <ServiceHero/>
            <AddNewItem appState={appState} updateMenu={updateMenu}/>
            <Menu menu={appState.menuItems}/>
        </div>
    )
}

export default Store
