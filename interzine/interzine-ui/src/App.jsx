import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Shop from './pages/Shop/Shop'
import Store from './pages/Store/Store'
// import AddNewItem from './pages/AddNewItem/AddNewItem'
import apiClient from './services/apiClient'
import Menu from './components/Menu/Menu'
import FoodDetail from './components/FoodDetail/FoodDetail'
import Hero from './components/Hero/Hero'
import Bot from './components/Bot/Bot'
import Aboutus from './components/Aboutus/Aboutus'
import Forsellers from './components/Forsellers/Forsellers'
import Locations from './components/Locations/Locations'
import Footer from './components/Footer/Footer'
import Orders from './components/Orders/Orders'
import Profile from './components/Profile/Profile'
import CheckoutForm from './components/CheckoutForm/CheckoutForm'
import OrdersReceived from './components/OrdersReceived/OrdersReceived'

function App() {
  const [client, setClient]= useState('user') //client is either 'user' or 'provider'
  const [menus, setMenus] = useState([])
  const [appState, setAppState] = useState({})
  const [isOpen, setIsOpen]= useState(false)
  const [viewProfile, setViewProfile]= useState(false)
  
  const [showChatBot, setShowChatBot] = useState(false);
  const handleToggleChatBot = () => {
      setShowChatBot((prevShowChatBot) => !prevShowChatBot);

  }

  
  

  useEffect(()=>{
    //need to get token from local storage then decode token and fetch user 
    let appUser
    const loadInitialData = async () => {
  
      // if (token) {
        const fromToken= await apiClient.fetchUserFromToken()
        appUser= fromToken?.data?.user
        
        console.log('loading initial data', appUser)

        if (appUser?.client === 'user' && (appUser.exp * 1000 > Date.now())) {
          console.log('oy')
          const services = await apiClient.fetchServicesByZip(appUser.zip_code)
          const prevOrders= await apiClient.fetchOrders()
          console.log('yo', services)
          setClient('user')
          setAppState({services: services?.data?.providers, user:appUser, isAuthenticated:true, cart:{}, prevOrders: prevOrders? prevOrders?.data?.listOrders : []})
        } else if (appUser?.client==='provider' && (appUser.exp * 1000 > Date.now()) ){
            const menu= await apiClient.fetchMenuItems(appUser?.id)
            const providerObject = await apiClient.fetchProviderByEmail(appUser?.email)
            const ordersRecieved= await apiClient.fetchOrdersReceived()

            setClient('provider')
            setAppState({menuItems: menu?.data?.menuItems, provider:appUser, providerObject: providerObject?.data?.provider, isAuthenticated:true, ordersRecieved: ordersRecieved?.data?.providerOrders })
          
          
        } else{
          await apiClient.logoutUser()
          setAppState({isAuthenticated:false})

        }
    }

    const token = localStorage.getItem('interzine_token')
    if (token) {
        apiClient.setToken(token)
        loadInitialData()
        console.log('fetch finished')
    } 

    

    

  }, [appState.isAuthenticated])

  console.log('app state', appState, client)

  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar appState={appState} logout={setAppState} setIsOpen={setIsOpen} setViewProfile={setViewProfile}/>
      <Sidebar setAppState={setAppState} setIsOpen= {setIsOpen} cart={appState?.cart} menus={menus} appState={appState} isOpen={isOpen} services={appState?.services}/>
      <Profile setViewProfile={setViewProfile} viewProfile={viewProfile}/> 

      <Routes>
        {
          appState.isAuthenticated ?
        (client==='user'&&
        <>
        <Route path='/' element={<Shop services={appState?.services}  menus={menus}/>}/>
        <Route path='menu/:id' element={<Menu setMenus={setMenus} services={appState?.services}/>}/>
        <Route path='food/:id' element={<FoodDetail cart={appState.cart} addToCart={setAppState}/>}/>
        <Route path='/orders' element={<Orders services={appState?.services} orders={appState?.prevOrders}/>}/>

        </>
        
        )||
        

        (client==='provider'&&
        <>
          <Route path='/' element={<Store appState={appState} updateMenu={setAppState}/>}/>
          <Route path='/orders' element={<OrdersReceived ordersRecieved={appState?.ordersRecieved}/>}/>
        </>
        
        )
          : 
          <Route path='/' element={
            <>
            <Hero />
            <Aboutus/>
            <Forsellers/>
            <Locations/>
            <Footer/>

            
            </>
          }/>
          // <> Log in or sign up to continue</>
      
        }
        

        <Route path='/login' element={<Login client= {client} setClient= {setClient} login={setAppState} appState={appState}/>}/>
        <Route path='/register' element={<Register client= {client} setClient= {setClient} register={setAppState} appState={appState}/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/for-sellers' element={<Forsellers/>}/>
        <Route path='/locations' element={<Locations/>}/>
      </Routes>
      </BrowserRouter>

        {/* </Routes>
        
      </BrowserRouter>    */}
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
      {/* <Bot/> */}

      {/* yoooooooo */}
    </div>
  )
}

export default App
