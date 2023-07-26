import React from 'react'

function ShoppingCart({cart, menu}) {
    const total=0

    return (
        <div className='shopping-cart'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <p> Your cart from </p>
            {/* <p> {cart[id]} </p> */}
            <button> Checkout {`$${total}`} </button>
            {cart?.map((item) => {
                const foodInCart= menu.find((food) => item===food.id)
                return (
                    <div>
                        <img src={foodInCart.image}/>
                        <h1> {foodInCart.name} </h1>
                        <p> {foodInCart.details} </p>
                        <p> {`$${foodInCart.cost}`} </p>
                        <button> 
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                            {foodInCart.quantity}
                            +

                        </button>
                    </div>
                )
            })
                

            }
            
        </div>
    )
}

export default ShoppingCart
