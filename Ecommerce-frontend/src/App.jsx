import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import JoinUs from './pages/Joinus'
import Profile from './pages/Profile'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/joinus' element={<JoinUs/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}

export default App
