import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
   <>
   <nav>
    <div className="logo">
        <h2>PixFinder</h2>
    </div>
    <div className="nav-links">
        <Link>Home</Link>
        <Link>Contact me</Link>
    </div>
   </nav>
   </>
  )
}

export default Navbar