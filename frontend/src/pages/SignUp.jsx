import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email || !password) {
            return toast.error('All fields are required', {
            position: 'top-right',
            })
        }

        try {
            const response = await axios.post('http://localhost:8080/users/signup', {
                name,
                email,
                password,
            })

            
            if(response.data.success) {
              toast.success('Signup successful!', { position: 'top-right' })
              setTimeout(()=>{
                navigate('/home');
              }, 1000)
            }
            

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Signup failed!'
            toast.error(errorMsg, { position: 'top-right' })
            console.error(error)
        }

        setName('');
        setEmail('');
        setPassword('');
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h1>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            onChange={(e)=>setName(e.target.value)}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
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
            value={password}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp
