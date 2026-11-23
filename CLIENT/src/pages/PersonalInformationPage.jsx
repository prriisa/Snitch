import { useState } from "react"
import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { ChevronLeft, Save } from "lucide-react"
import { updateMyProfile } from "../api/accountApi"
import { updateUser } from "../redux/Slice/authSlice"
import { setToast } from "../redux/Slice/toastSlice"

const PersonalInformationPage = () => {
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const [name, setName] = useState(user?.name || "")
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    const saveProfile = async (event) => {
        event.preventDefault()
        const trimmedName = name.trim()
        if (trimmedName.length < 3 || trimmedName.length > 100) {
            setError("Name must be between 3 and 100 characters.")
            return
        }

        setIsSaving(true)
        setError("")
        try {
            const response = await updateMyProfile({ name: trimmedName })
            const updatedUser = response.data?.data?.userData
            if (!updatedUser) throw new Error("The server returned an invalid profile.")
            dispatch(updateUser(updatedUser))
            setName(updatedUser.name)
            dispatch(setToast({ success: true, message: "Personal information updated." }))
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Could not update your information.")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-8 md:pt-32">
            <div className="mx-auto max-w-3xl">
                <Link to="/me" className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-600 hover:text-black">
                    <ChevronLeft size={16} /> My account
                </Link>
                <header className="mb-8 border-b border-black/10 pb-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Account details</p>
                    <h1 className="mt-2 text-3xl font-semibold uppercase tracking-wide md:text-4xl">Personal information</h1>
                    <p className="mt-2 text-sm text-neutral-600">Update the name associated with your account.</p>
                </header>

                {error && <p role="alert" className="mb-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

                <form onSubmit={saveProfile} className="space-y-5 bg-white p-5 shadow-sm md:p-8">
                    <label className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-neutral-600">Full name</span>
                        <input
                            required
                            minLength={3}
                            maxLength={100}
                            autoComplete="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-neutral-600">Email address</span>
                        <input
                            readOnly
                            value={user?.email || ""}
                            className="w-full border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-500 outline-none"
                        />
                        <span className="mt-2 block text-xs text-neutral-500">Email address cannot be changed here.</span>
                    </label>

                    <div className="flex flex-col gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs uppercase tracking-widest text-neutral-500">Account type: {user?.role || "customer"}</p>
                        <button type="submit" disabled={isSaving || name.trim() === user?.name} className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-white hover:bg-[#e64b2b] disabled:cursor-not-allowed disabled:opacity-40">
                            <Save size={15} /> {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default PersonalInformationPage
