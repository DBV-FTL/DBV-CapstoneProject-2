import React, {useEffect} from 'react'
import apiClient from '../../services/apiClient'
import OrderCard from '../OrderCard/OrderCard'
import './Orders.css'

function Orders({orders, services}) {
    const groupedById= {}
    console.log('orders', orders)
    const sortedOrders= orders?.toSorted()?.reverse()
    console.log('sorted orders', sortedOrders)

    useEffect(()=>{

    }, [orders])

    if (orders){
    for (const order of orders){
        if (order.order_id in groupedById) {
            groupedById[order.order_id].push(order)
        } else {
            groupedById[order.order_id]= [order]
        }
    }
}

const reversed= Object.entries(groupedById)?.sort((a, b) => {
    return b[0] - a[0]
  })


    return (
        <div className='orders'>
            {reversed?.map(([order_id, items])=> {
                const provider= services?.find((service)=> items[0].provider_id===service.id)
                return <OrderCard provider={provider} order_id={order_id} items={items}/>
             }
             )}
        </div>
    )
}

export default Orders
