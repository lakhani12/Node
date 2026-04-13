import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Our Store</h1>
        <p className="text-gray-600 mb-8">Discover amazing products and start shopping today!</p>
        <Link to='/login'>
          <button className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-800 transition-colors">
            Go to Login Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
