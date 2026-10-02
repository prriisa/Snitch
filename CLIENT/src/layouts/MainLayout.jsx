import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Main/Navbar'
import MobileBottomNav from '../components/Main/MobileNav'

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <MobileBottomNav/>
    </div>
  )
}

export default MainLayout