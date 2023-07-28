import React, { useState } from 'react'
import apiClient from '../../services/apiClient'

function ShoppingCart({cart, menus, services}) {
    const total=0
    console.log(cart, menus)
    // const [itemsInCart, setItemsInCart] = useState([])
    let itemsInCart= []

    async function order(){
        await apiClient.checkoutFoods(itemsInCart)
    }

    return (
        <div className='shopping-cart'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <p> Your cart from </p>
            {Object.entries(cart)?.map(([id, quantity]) => {
                const foodInCart= menus.find((food) => food.id===parseInt(id))
                const provider= services.find((service) => service.id=== foodInCart.service_provider_id)
                console.log('in cart',foodInCart)
                itemsInCart= [...itemsInCart, {product_name: foodInCart.name, service_provider_id: foodInCart.service_provider_id, quantity}]
                // setItemsInCart([...itemsInCart, {product_name: foodInCart.name, service_provider_id: foodInCart.service_provider_id, quantity}])
                return (
                    <div>
                        <img className='food-image' src={foodInCart.image_url}/>
                        <h1> {foodInCart.name} </h1>
                        {/* need food details field */}
                        <p> {`$${foodInCart.cost}`} </p>
                        <p> {`${provider.name}`} </p>
                        <button> 
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                            {quantity}
                            +

                        </button>
                    </div>
                )
            })
                

            }
            
            <button onClick={() => order()}> Checkout {`$${total}`} </button>

            
        </div>
    )
}

export default ShoppingCart
