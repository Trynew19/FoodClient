import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Food Delivery</Link>
        
        <nav className="space-x-4">
          {user ? (
            <>
              <Link to="/orders" className="hover:text-gray-300">Orders</Link>
              {user.isAdmin && (
                <Link to="/admin/menu" className="hover:text-gray-300">Admin</Link>
              )}
              <button onClick={logout} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}