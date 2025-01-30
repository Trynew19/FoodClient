import { useEffect, useState } from 'react'
import { api } from '../services/api'
import MenuItem from '../components/MenuItem'
import Cart from '../components/Cart'

export default function Menu() {
  const [menu, setMenu] = useState([]) // Ensure menu is always an array
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await api.get('/menu')

        console.log("API Response:", data) // ✅ Debugging: Check API response

        // ✅ Ensure data is an array before updating state
        if (Array.isArray(data)) {
          setMenu(data)
        } else {
          console.error("Expected an array, but got:", data)
          setMenu([]) // Set an empty array to avoid errors
        }
      } catch (error) {
        console.error("Error fetching menu:", error)
        setMenu([]) // Prevent .map() error by setting empty array
      }
      setLoading(false)
    }
    fetchMenu()
  }, [])

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading menu...</p>
        ) : (
          // ✅ Safe .map() usage
          Array.isArray(menu) && menu.length > 0 ? (
            menu.map((item) => <MenuItem key={item._id} item={item} />)
          ) : (
            <p>No menu items available.</p> // ✅ Handle empty menu case
          )
        )}
      </div>
      <Cart />
    </div>
  )
}
