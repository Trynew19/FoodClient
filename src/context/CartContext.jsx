import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.menuId === item._id)
      if (existing) {
        return prev.map((i) =>
          i.menuId === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { menuId: item._id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const removeFromCart = (menuId) => {
    setCartItems((prev) => prev.filter((item) => item.menuId !== menuId))
  }

  const clearCart = () => setCartItems([])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)