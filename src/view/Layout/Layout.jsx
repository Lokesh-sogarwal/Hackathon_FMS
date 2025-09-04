import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Nav from '../../Components/NavBar/nav'
import { ToastContainer } from 'react-toastify'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <>
      <div className="d-flex layout-container">
        <div className="side-bar-container">
          <Sidebar />
        </div>
        <div className="flex-grow-1 p-3 col-8 content-box">
          <Nav />
          {children}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Layout
