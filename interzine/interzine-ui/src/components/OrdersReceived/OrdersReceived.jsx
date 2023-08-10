import React from 'react'
import OrderCard from '../OrderCard/OrderCard'
import OrderReceivedCard from '../OrderReceivedCard/OrderReceivedCard'

function OrdersReceived({ordersReceived}) {
    // const ordersRec= orders?.filter((order)=> order.provider_id===provider.id)
    const groupedById= {}

    console.log('oc', ordersReceived)
    
    if (ordersReceived){
        for (const order of ordersReceived){
            if (order.order_id in groupedById) {
                groupedById[order.user_id].push(order)
            } else {
                groupedById[order.user_id]= [order]
            }
        }
    }
    
    const reversed= Object.entries(groupedById)?.sort((a, b) => {
        return b[0] - a[0]
      })


    return (
        <div className='orders-received'>
            {
                reversed?.map(([userId, items]) => <OrderReceivedCard items={items} userId={userId}/>)
            }
        </div>
    )
}

export default OrdersReceived
