import { useState, useEffect } from 'react'
import { api } from '../services/api'

export default function AdminMenu() {
  const [menu, setMenu] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    availability: true
  })
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const { data } = await api.get('/menu')
    setMenu(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`/menu/${editId}`, formData)
      } else {
        await api.post('/menu/', formData)
      }
      setFormData({ name: '', category: 'Main Course', price: '', availability: true })
      setEditId(null)
      fetchMenu()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/menu/${id}`)
      fetchMenu()
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {editId ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option>Appetizers</option>
              <option>Main Course</option>
              <option>Desserts</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2">Price</label>
            <input
              required
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
              className="w-4 h-4"
            />
            <label>Available</label>
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? 'Update Item' : 'Add Item'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-green-600 font-bold">${item.price}</p>
            <p className={item.availability ? 'text-green-500' : 'text-red-500'}>
              {item.availability ? 'Available' : 'Unavailable'}
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => {
                  setFormData(item)
                  setEditId(item._id)
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}