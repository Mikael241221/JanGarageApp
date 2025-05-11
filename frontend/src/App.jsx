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


function App() {
   return (
    
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
