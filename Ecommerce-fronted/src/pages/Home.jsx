import React from 'react'
import { Link } from 'react-router-dom'
import {DataContext} from "../context/userContext.jsx"
import { useContext } from 'react'

const Home = () => {
  const {userdata} = useContext(DataContext);
  return (
    <>
    <div className='w-full h-screen flex items-center justify-center'>
        <Link to="/login">
        <button className='w-full rounded-2xl text-white bg-black'>
            Go To Login Page
        </button>
        </Link>
    </div>
    </>
  )
}

export default Home
