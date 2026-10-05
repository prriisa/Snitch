import { Outlet } from "react-router"
import PopupToast from "../components/toaster"
import { useSelector } from "react-redux"

const AuthLayout = () => {
    const toast = useSelector((state) => state.toast.toast)

    return (
        <div className="bg-black relative min-h-screen">

            {/* toaster message */}
            {toast && (
                <PopupToast
                    success={toast.success}
                    message={toast.message}
                />
            )}

            <Outlet />
        </div>
    )
}

export default AuthLayout