import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Main/Navbar'
import MobileBottomNav from '../components/Main/MobileNav'
import { useSelector } from 'react-redux'
import PopupToast from '../components/toaster'

const MainLayout = () => {
  const toast = useSelector((state) => state.toast.toast)

  return (
    <div className='relative min-h-screen'>

      {/* toaster message */}
      {toast && (
        <PopupToast
          success={toast.success}
          message={toast.message}
        />
      )}

      <Navbar />
      <Outlet />
      <MobileBottomNav />
    </div>
  )
}

export default MainLayout