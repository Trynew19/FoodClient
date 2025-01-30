import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import AdminMenu from './pages/AdminMenu'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin/menu" element={<AdminMenu />} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  )
}