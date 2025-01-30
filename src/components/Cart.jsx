import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { api } from '../services/api'

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, total } = useCart()
  const [loading, setLoading] = useState(false)

  const handleOrder = async () => {
    setLoading(true)
    try {
      await api.post('/orders', {
        items: cartItems.map(item => ({
          menuId: item.menuId,
          quantity: item.quantity
        }))
      })
      clearCart()
      alert('Order placed successfully!')
    } catch (error) {
      console.error(error)
      alert('Order failed')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.menuId} className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">
                  {item.quantity} x ${item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.menuId)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}