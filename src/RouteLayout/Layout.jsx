import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import InvoicePage from '../Pages/InvoicePage'
import BusinessProfile from '../components/BusinessProfile'

function Layout() {
  return (
   <Router>
    <Routes>
      <Route path='/invoice' element={<InvoicePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/businessprofile' element={<BusinessProfile/>}/>
    </Routes>
   </Router>
  )
}

export default Layout