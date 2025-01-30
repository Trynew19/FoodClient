import { useEffect, useState } from 'react'
import { api } from '../services/api'
import MenuItem from '../components/MenuItem'
import Cart from '../components/Cart'
// import SearchBar from '../components/SearchBar';


export default function Menu() {
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await api.get('/menu')
        setMenu(data)
      } catch (error) {
        console.error(error)
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
          menu.map((item) => <MenuItem key={item._id} item={item} />)
        )}
      </div>
      <Cart />
    </div>
  )
}