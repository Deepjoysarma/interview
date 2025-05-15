import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      toast.warning('Please login first.', { position: 'top-right' })
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('jwtToken')
    toast.success('Logged out successfully!', { position: 'top-right' })
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Home Page</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md transition duration-200"
      >
        Logout
      </button>

      <ToastContainer />
    </div>
  )
}

export default Home
