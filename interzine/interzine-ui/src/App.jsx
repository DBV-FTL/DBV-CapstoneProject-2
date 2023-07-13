import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Shop from './pages/Shop/Shop'

function App() {
  const [appState, setAppState] = useState({
    user: {},
    isAuthenticated: false,
    pastOrders: [],
    services: [{}]
  }) //all app state set here 


  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Shop services={appState.services} />}/>
        <Route path='/login' element={<Login logIn={setAppState} appState={appState}/>}/>
        <Route path='/register' element={<Register register={setAppState} appState={appState}/>}/>
      </Routes>
      </BrowserRouter>
      


      {/* yoooooooo */}
    </div>
  )
}

export default App
