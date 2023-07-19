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
import Store from './pages/Store/Store'
import AddNewItem from './pages/AddNewItem/AddNewItem'


function App() {
  const [client, setClient]= useState('user') //client is either 'user' or 'provider'
  const [userState, setUserState] = useState({
    user: {},
    isAuthenticated: false,
    pastOrders: [],
    services: [{
      name: "Tsehay",
      image_url: 'https://www.rumispice.com/cdn/shop/articles/your-guide-to-the-history-taste-of-ethiopian-food-869598.jpg?v=1663735781',
      rating: 5
      },
      {
      name: "Bersabe",
      image_url: 'https://bloximages.newyork1.vip.townnews.com/sandiegomagazine.com/content/tncms/assets/v3/editorial/d/8c/d8c6d926-72fb-11eb-a628-efc4e9abab37/6030319469eb5.image.jpg?resize=1200%2C900',
      rating: 5
      },
      {
      name: 'kitfo',
      image_url: 'https://vegnews.com/media/W1siZiIsIjMxODgxL1ZlZ05ld3MuQnVubmFDYWZlLmpwZyJdLFsicCIsInRodW1iIiwiMTYwMHg5NDYjIix7ImZvcm1hdCI6ImF2aWYifV1d/VegNews.BunnaCafe.avif?sha=2687c1e6efaf1c3d',
      rating: 5
      }]
  }) //all app state set here 

  const [providerState, setProviderState] = useState({
    provider: {},
    isAuthenticated: false,
    menuItems: []
  })
  
  let appState
  let setAppState

  if (client==='user'){
    appState= userState
    setAppState= setUserState
  } else if (client==='provider'){
    appState= providerState
    setAppState= setProviderState
  }

  console.log('app state', appState)

  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar appState={appState} logout={setAppState}/>
      <Sidebar/>
      <Routes>
        { client==='user'&&
        <Route path='/' element={<Shop services={appState.services} />}/>
        }

        { client==='provider'&&
        <>
        <Route path='/' element={<Store appState={appState} updateMenu={setAppState}/>}/>
        {/* <Route path='/add-new' element={<AddNewItem  />}/> */}
        </>

        }

        <Route path='/login' element={<Login client= {client} setClient= {setClient} login={setAppState} appState={appState}/>}/>
        <Route path='/register' element={<Register client= {client} setClient= {setClient} register={setAppState} appState={appState}/>}/>
      </Routes>
      </BrowserRouter>
      


      {/* yoooooooo */}
    </div>
  )
}

export default App
