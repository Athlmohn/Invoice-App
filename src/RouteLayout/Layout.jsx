import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../Pages/Home'
import BusinessProfile from '../components/BusinessProfile'

function Layout() {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/businessprofile' element={<BusinessProfile/>}/>
    </Routes>
   </Router>
  )
}

export default Layout