import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'

function Layout() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
    </Routes>
   </Router>
  )
}

export default Layout