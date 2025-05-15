import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email,
        password
      })

      if(response.data.success) {
        const token = response.data.jwtToken;
        
        localStorage.setItem('jwtToken', token)

        toast.success('Login successful!', { position: 'top-right' })

        setTimeout(()=>{
          navigate('/home');
        }, 1000)
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed!'
      toast.error(errorMsg, { position: 'top-right' })
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Enter your password..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
