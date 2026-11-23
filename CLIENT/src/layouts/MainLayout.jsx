import { Outlet, ScrollRestoration } from 'react-router'
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
      <footer className='mt-12 border-t border-black/10 bg-white px-4 py-6 pb-24 text-center text-xs uppercase tracking-[0.16em] text-neutral-500 md:pb-6'>
        <p>Created by <span className='font-semibold text-black'>Priya Sharma</span></p>
      </footer>
      <MobileBottomNav />
      <ScrollRestoration getKey={(location) => location.pathname} />
    </div>
  )
}

export default MainLayout