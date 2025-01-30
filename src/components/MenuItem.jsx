import { useCart } from '../context/CartContext'

export default function MenuItem({ item }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{item.name}</h3>
      <p className="text-gray-600">{item.category}</p>
      <p className="text-green-600 font-bold">${item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  )
}