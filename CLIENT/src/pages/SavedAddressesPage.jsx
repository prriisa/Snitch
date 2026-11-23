import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useDispatch } from "react-redux"
import { Check, ChevronLeft, MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react"
import {
    createSavedAddress,
    deleteSavedAddress,
    fetchSavedAddresses,
    setDefaultSavedAddress,
    updateSavedAddress
} from "../api/accountApi"
import { setToast } from "../redux/Slice/toastSlice"

const emptyAddress = {
    label: "Home",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false
}

const SavedAddressesPage = () => {
    const dispatch = useDispatch()
    const [addresses, setAddresses] = useState([])
    const [form, setForm] = useState(emptyAddress)
    const [editingAddressId, setEditingAddressId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        let isMounted = true
        fetchSavedAddresses()
            .then((response) => {
                if (isMounted) setAddresses(response.data?.data?.addresses || [])
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || "Could not load saved addresses.")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })
        return () => { isMounted = false }
    }, [])

    const updateForm = (event) => {
        const { name, value, checked, type } = event.target
        setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }))
    }

    const resetForm = () => {
        setForm(emptyAddress)
        setEditingAddressId("")
    }

    const editAddress = (address) => {
        setEditingAddressId(address._id)
        setForm({
            label: address.label || "Home",
            fullName: address.fullName,
            phone: address.phone,
            address: address.address,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            isDefault: address.isDefault
        })
        setError("")
    }

    const saveAddress = async (event) => {
        event.preventDefault()
        setIsSaving(true)
        setError("")
        try {
            const response = editingAddressId
                ? await updateSavedAddress(editingAddressId, form)
                : await createSavedAddress(form)
            const updatedAddresses = response.data?.data?.addresses
            if (!Array.isArray(updatedAddresses)) throw new Error("The server returned an invalid address list.")
            setAddresses(updatedAddresses)
            resetForm()
            dispatch(setToast({ success: true, message: editingAddressId ? "Address updated." : "Address saved." }))
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Could not save this address.")
        } finally {
            setIsSaving(false)
        }
    }

    const makeDefault = async (addressId) => {
        setError("")
        try {
            const response = await setDefaultSavedAddress(addressId)
            setAddresses(response.data?.data?.addresses || [])
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not update the default address.")
        }
    }

    const removeAddress = async (address) => {
        if (!window.confirm(`Delete the ${address.label || "saved"} address?`)) return
        setError("")
        try {
            const response = await deleteSavedAddress(address._id)
            setAddresses(response.data?.data?.addresses || [])
            if (editingAddressId === address._id) resetForm()
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not delete this address.")
        }
    }

    const fields = [
        { name: "fullName", label: "Full name", autoComplete: "name", maxLength: 100 },
        { name: "phone", label: "Phone number", autoComplete: "tel", maxLength: 20 },
        { name: "address", label: "House number and street", autoComplete: "street-address", maxLength: 200, wide: true },
        { name: "city", label: "City", autoComplete: "address-level2", maxLength: 80 },
        { name: "state", label: "State", autoComplete: "address-level1", maxLength: 80 },
        { name: "pincode", label: "PIN code", autoComplete: "postal-code", maxLength: 12, wide: true }
    ]

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-8 md:pt-32">
            <div className="mx-auto max-w-5xl">
                <Link to="/me" className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-600 hover:text-black">
                    <ChevronLeft size={16} /> My account
                </Link>
                <header className="mb-8 border-b border-black/10 pb-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Delivery information</p>
                    <h1 className="mt-2 text-3xl font-semibold uppercase tracking-wide md:text-4xl">Saved addresses</h1>
                    <p className="mt-2 text-sm text-neutral-600">Manage delivery addresses for your orders.</p>
                </header>

                {error && <p role="alert" className="mb-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

                <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
                    <form onSubmit={saveAddress} className="bg-white p-5 shadow-sm md:p-7">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center bg-black text-white"><MapPin size={17} /></span>
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-widest">{editingAddressId ? "Edit address" : "Add address"}</h2>
                                <p className="mt-1 text-xs text-neutral-500">Fields marked below are required.</p>
                            </div>
                        </div>
                        <label className="mb-3 block">
                            <span className="mb-1.5 block text-xs text-neutral-600">Address label</span>
                            <input name="label" required maxLength={30} value={form.label} onChange={updateForm} placeholder="Home, Work..." className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black" />
                        </label>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {fields.map(({ name, label, autoComplete, maxLength, wide }) => (
                                <label key={name} className={wide ? "sm:col-span-2" : ""}>
                                    <span className="mb-1.5 block text-xs text-neutral-600">{label}</span>
                                    <input
                                        required
                                        name={name}
                                        maxLength={maxLength}
                                        autoComplete={autoComplete}
                                        inputMode={name === "phone" || name === "pincode" ? "tel" : undefined}
                                        value={form[name]}
                                        onChange={updateForm}
                                        className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black"
                                    />
                                </label>
                            ))}
                        </div>
                        <label className="mt-4 flex items-center gap-2 text-xs text-neutral-700">
                            <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={updateForm} className="h-4 w-4 accent-black" />
                            Set as default address
                        </label>
                        <div className="mt-5 flex gap-3">
                            <button type="submit" disabled={isSaving} className="flex flex-1 items-center justify-center gap-2 bg-black px-4 py-3 text-xs font-medium uppercase tracking-widest text-white hover:bg-[#e64b2b] disabled:opacity-50">
                                <Plus size={15} /> {isSaving ? "Saving..." : editingAddressId ? "Save address" : "Add address"}
                            </button>
                            {editingAddressId && <button type="button" onClick={resetForm} className="border border-neutral-300 px-4 py-3 text-xs uppercase tracking-widest">Cancel</button>}
                        </div>
                    </form>

                    <section>
                        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-600">Your addresses ({addresses.length})</h2>
                        {isLoading ? (
                            <div className="h-40 animate-pulse bg-neutral-200" />
                        ) : addresses.length ? (
                            <div className="space-y-3">
                                {addresses.map((address) => (
                                    <article key={address._id} className="bg-white p-5 shadow-sm">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-sm font-semibold uppercase">{address.label}</h3>
                                                    {address.isDefault && <span className="inline-flex items-center gap-1 bg-green-50 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-green-800"><Check size={12} /> Default</span>}
                                                </div>
                                                <p className="mt-3 text-sm font-medium">{address.fullName}</p>
                                                <p className="mt-1 text-sm text-neutral-600">{address.phone}</p>
                                                <p className="mt-2 text-sm leading-6 text-neutral-600">{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                                            </div>
                                            <div className="flex shrink-0 gap-1">
                                                <button type="button" onClick={() => editAddress(address)} aria-label={`Edit ${address.label} address`} className="p-2 text-neutral-600 hover:text-black"><Pencil size={16} /></button>
                                                <button type="button" onClick={() => removeAddress(address)} aria-label={`Delete ${address.label} address`} className="p-2 text-neutral-600 hover:text-red-600"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                        {!address.isDefault && (
                                            <button type="button" onClick={() => makeDefault(address._id)} className="mt-4 inline-flex items-center gap-1 border-t border-neutral-200 pt-3 text-[10px] uppercase tracking-widest text-neutral-600 hover:text-black">
                                                <Star size={13} /> Make default
                                            </button>
                                        )}
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-40 flex-col items-center justify-center bg-white p-6 text-center">
                                <MapPin size={27} strokeWidth={1.3} />
                                <p className="mt-3 text-sm uppercase tracking-wide">No saved addresses</p>
                                <p className="mt-1 text-xs text-neutral-500">Add an address to make checkout quicker.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default SavedAddressesPage
