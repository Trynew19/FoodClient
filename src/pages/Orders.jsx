import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders')
        setOrders(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-between">
            <p>Order ID: {order._id}</p>
            <p className="font-bold">${order.totalAmount}</p>
          </div>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  )
}