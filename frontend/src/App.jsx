import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useContext } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import Home from "./markup/pages/Home"
import Login from "./markup/pages/Login"
import AddEmployee from "./markup/pages/admin/AddEmployee"

// import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import "./assets/styles/custom.css";

// import the header and footer component
import Header from "./markup/components/Header/Header";
import Footer from "./markup/components/Footer/Footer";
import Unauthorized from './markup/pages/Unauthorized'
import Employees from './markup/pages/admin/Employees'
import Orders from './markup/pages/admin/Orders'
import Customer from './markup/pages/admin/Customer'
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute'


function App() {
   return (
    
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
        <Route path='/unauthorized' element={<Unauthorized/>}></Route>
        <Route path="/admin/employees" element={<Employees />} />
        <Route path="/admin/orders" element={<PrivateAuthRoute roles={[1,2,3]}>
          <Orders/>
        </PrivateAuthRoute>} />
        <Route path="/admin/customer" element={<PrivateAuthRoute roles={[2,3]}>
          <Customer/>
        </PrivateAuthRoute>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
