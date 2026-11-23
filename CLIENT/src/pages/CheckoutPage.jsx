import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { Check, ChevronLeft, MapPin, PackageCheck, Wallet } from "lucide-react"
import { fetchCart } from "../api/cartApi"
import { createOrder } from "../api/orderApi"
import { setToast } from "../redux/Slice/toastSlice"
import { calculateOrderFees } from "../utils/orderFees"
import { fetchSavedAddresses } from "../api/accountApi"

const initialAddress = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
}

const formatPrice = (amount, currency) => {
    const formattedAmount = Number(amount || 0).toLocaleString("en-IN")
    return currency === "INR" ? `₹${formattedAmount}` : `${currency || ""} ${formattedAmount}`
}

const CheckoutPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selectedItemIds = location.state?.selectedItemIds
    const [items, setItems] = useState([])
    const [address, setAddress] = useState(initialAddress)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [placedOrder, setPlacedOrder] = useState(null)
    const [error, setError] = useState("")
    const [savedAddresses, setSavedAddresses] = useState([])
    const [selectedAddressId, setSelectedAddressId] = useState("")
    const [savedAddressError, setSavedAddressError] = useState("")
    const hasEditedAddress = useRef(false)

    const loadCart = useCallback(async () => {
        const response = await fetchCart()
        return response.data?.data?.products || []
    }, [])

    useEffect(() => {
        let isMounted = true
        fetchSavedAddresses()
            .then((response) => {
                if (!isMounted) return
                const addresses = response.data?.data?.addresses || []
                setSavedAddresses(addresses)
                const defaultAddress = addresses.find((item) => item.isDefault)
                if (defaultAddress && !hasEditedAddress.current) {
                    setSelectedAddressId(defaultAddress._id)
                    setAddress({
                        fullName: defaultAddress.fullName,
                        phone: defaultAddress.phone,
                        address: defaultAddress.address,
                        city: defaultAddress.city,
                        state: defaultAddress.state,
                        pincode: defaultAddress.pincode
                    })
                }
            })
            .catch((requestError) => {
                if (isMounted) setSavedAddressError(requestError.response?.data?.message || "Saved addresses could not be loaded.")
            })
        return () => { isMounted = false }
    }, [])

    useEffect(() => {
        let isMounted = true
        if (!selectedItemIds?.length) {
            navigate("/cart", { replace: true })
            return undefined
        }

        loadCart()
            .then((cartItems) => {
                if (!isMounted) return
                const selected = cartItems.filter((item) => selectedItemIds.includes(item._id))
                if (!selected.length) {
                    navigate("/cart", { replace: true })
                    return
                }
                setItems(selected)
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || "Could not load the products you selected.")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })
        return () => { isMounted = false }
    }, [selectedItemIds, loadCart, navigate])

    useEffect(() => {
        if (!placedOrder) return undefined
        const timer = setTimeout(() => {
            navigate("/orders", { replace: true })
        }, 1900)
        return () => clearTimeout(timer)
    }, [placedOrder, navigate])

    const currency = items[0]?.product?.price?.currency || "INR"
    const total = useMemo(() => items.reduce(
        (sum, item) => sum + (item.product?.price?.amount || 0) * item.quantity,
        0
    ), [items])
    const fees = calculateOrderFees(total, currency)
    const hasMixedCurrencies = items.some((item) => item.product?.price?.currency !== currency)
    const hasUnavailableProduct = items.some((item) => !item.product)
    const hasInsufficientStock = items.some((item) => {
        const size = item.product?.sizes?.find((entry) => entry.size === item.size)
        return !size || size.stock < item.quantity
    })

    const updateAddress = (event) => {
        const { name, value } = event.target
        hasEditedAddress.current = true
        setSelectedAddressId("")
        setAddress((current) => ({ ...current, [name]: value }))
    }

    const selectSavedAddress = (event) => {
        const addressId = event.target.value
        const savedAddress = savedAddresses.find((item) => item._id === addressId)
        setSelectedAddressId(addressId)
        if (!savedAddress) return

        hasEditedAddress.current = true
        setAddress({
            fullName: savedAddress.fullName,
            phone: savedAddress.phone,
            address: savedAddress.address,
            city: savedAddress.city,
            state: savedAddress.state,
            pincode: savedAddress.pincode
        })
    }

    const submitOrder = async (event) => {
        event.preventDefault()
        setError("")
        if (hasMixedCurrencies || hasUnavailableProduct || hasInsufficientStock) {
            setError("Your selected items or available stock changed. Return to your bag and review them.")
            return
        }

        setIsSubmitting(true)
        try {
            await createOrder({
                products: items.map((item) => ({
                    product: item.product._id,
                    size: item.size,
                    quantity: item.quantity
                })),
                shippingAddress: address,
                paymentMethod: "COD"
            })
            setPlacedOrder(true)
            dispatch(setToast({ success: true, message: "Your order has been placed." }))
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not place your order. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (placedOrder) {
        return (
            <main className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-white/95 px-6 text-center backdrop-blur-sm">
                <div className="order-success-card max-w-md">
                    <div className="order-success-icon mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e8f5e9] text-[#24743a]">
                        <Check size={42} strokeWidth={2} />
                    </div>
                    <p className="mt-8 text-xs uppercase tracking-[0.3em] text-neutral-500">Snitch</p>
                    <h1 className="mt-3 text-3xl font-semibold uppercase tracking-wide">Order placed</h1>
                    <p className="mt-3 text-sm text-neutral-600">Your order is confirmed. Redirecting to your orders...</p>
                    <div className="mx-auto mt-7 h-1 w-48 overflow-hidden bg-neutral-200">
                        <div className="order-success-progress h-full bg-black" />
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-8 md:pt-32">
            <div className="mx-auto max-w-6xl">
                <Link to="/cart" state={{ selectedItemIds }} className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-600 hover:text-black">
                    <ChevronLeft size={16} /> Back to bag
                </Link>
                <div className="mb-8 border-b border-black/10 pb-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Almost yours</p>
                    <h1 className="mt-2 text-3xl font-semibold uppercase tracking-wide md:text-4xl">Checkout</h1>
                    <p className="mt-2 text-sm text-neutral-600">Review your delivery details and confirm your order.</p>
                </div>

                {error && <p role="alert" className="mb-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

                {isLoading ? (
                    <div className="grid gap-6 md:grid-cols-[1.4fr_0.8fr]">
                        <div className="h-[520px] animate-pulse bg-neutral-200" />
                        <div className="h-80 animate-pulse bg-neutral-200" />
                    </div>
                ) : (
                    <form onSubmit={submitOrder} className="grid items-start gap-6 md:grid-cols-[1.4fr_0.8fr]">
                        <div className="space-y-5">
                            <section className="bg-white p-5 shadow-sm md:p-7">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center bg-black text-white"><MapPin size={17} /></span>
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-widest">Delivery details</h2>
                                        <p className="mt-1 text-xs text-neutral-500">Where should we deliver your order?</p>
                                    </div>
                                </div>
                                {savedAddresses.length > 0 && (
                                    <label className="mb-4 block">
                                        <span className="mb-1.5 block text-xs text-neutral-600">Use a saved address</span>
                                        <select value={selectedAddressId} onChange={selectSavedAddress} className="w-full border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-black">
                                            <option value="">Enter a new address</option>
                                            {savedAddresses.map((savedAddress) => (
                                                <option key={savedAddress._id} value={savedAddress._id}>
                                                    {savedAddress.label} — {savedAddress.city}, {savedAddress.pincode}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                )}
                                {savedAddressError && <p role="status" className="mb-3 text-xs text-neutral-500">{savedAddressError} You can still enter the delivery details below.</p>}
                                <Link to="/account/addresses" className="mb-4 inline-flex text-xs uppercase tracking-widest text-neutral-600 underline hover:text-black">
                                    Manage saved addresses
                                </Link>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <input required name="fullName" maxLength={100} value={address.fullName} onChange={updateAddress} placeholder="Full name" autoComplete="name" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black sm:col-span-2" />
                                    <input required name="phone" maxLength={20} value={address.phone} onChange={updateAddress} placeholder="Phone number" autoComplete="tel" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black sm:col-span-2" />
                                    <input required name="address" maxLength={200} value={address.address} onChange={updateAddress} placeholder="House number and street" autoComplete="street-address" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black sm:col-span-2" />
                                    <input required name="city" maxLength={80} value={address.city} onChange={updateAddress} placeholder="City" autoComplete="address-level2" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black" />
                                    <input required name="state" maxLength={80} value={address.state} onChange={updateAddress} placeholder="State" autoComplete="address-level1" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black" />
                                    <input required name="pincode" maxLength={12} value={address.pincode} onChange={updateAddress} placeholder="PIN code" autoComplete="postal-code" className="border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black sm:col-span-2" />
                                </div>
                            </section>

                            <section className="flex items-center gap-4 border border-black bg-white p-5">
                                <span className="flex h-10 w-10 items-center justify-center bg-neutral-100"><Wallet size={19} /></span>
                                <div>
                                    <h2 className="text-xs font-semibold uppercase tracking-widest">Payment method</h2>
                                    <p className="mt-1 text-sm">Cash on delivery</p>
                                </div>
                                <span className="ml-auto border border-neutral-300 px-2 py-1 text-[10px] uppercase tracking-widest">COD</span>
                            </section>
                        </div>

                        <aside className="bg-white p-5 shadow-sm md:sticky md:top-28 md:p-6">
                            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                                <PackageCheck size={20} />
                                <h2 className="text-sm font-semibold uppercase tracking-widest">Your order</h2>
                            </div>
                            <div className="max-h-72 divide-y divide-neutral-100 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item._id} className="flex gap-3 py-4">
                                        <div className="h-16 w-14 shrink-0 bg-neutral-100">
                                            {item.product?.images?.[0]?.url && <img src={item.product.images[0].url} alt={item.product.title} className="h-full w-full object-cover" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium uppercase">{item.product?.title || "Unavailable product"}</p>
                                            <p className="mt-1 text-xs text-neutral-500">Size {item.size} · Qty {item.quantity}</p>
                                        </div>
                                        <span className="text-xs font-medium">{formatPrice((item.product?.price?.amount || 0) * item.quantity, item.product?.price?.currency)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 space-y-3 border-t border-neutral-200 pt-4 text-sm">
                                <div className="flex justify-between text-neutral-600"><span>Products</span><span>{items.length}</span></div>
                                <div className="flex justify-between text-neutral-600"><span>Payment</span><span>Cash on delivery</span></div>
                                <div className="flex justify-between text-neutral-600"><span>Subtotal</span><span>{formatPrice(total, currency)}</span></div>
                                {currency === "INR" && (
                                    <>
                                        <div className="flex justify-between text-neutral-600"><span>Platform fee</span><span>{formatPrice(fees.platformFee, currency)}</span></div>
                                        <div className="flex justify-between text-neutral-600"><span>Delivery</span><span>{fees.deliveryFee ? formatPrice(fees.deliveryFee, currency) : "Free"}</span></div>
                                    </>
                                )}
                                <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold"><span>Total</span><span>{formatPrice(fees.totalAmount, currency)}</span></div>
                            </div>
                            {(hasMixedCurrencies || hasUnavailableProduct || hasInsufficientStock) && (
                                <p className="mt-3 text-xs text-red-700">Items or stock changed. Go back to your bag and review the selection.</p>
                            )}
                            <button type="submit" disabled={isSubmitting || !items.length || hasMixedCurrencies || hasUnavailableProduct || hasInsufficientStock} className="mt-5 w-full bg-black px-4 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#e64b2b] disabled:cursor-not-allowed disabled:opacity-40">
                                {isSubmitting ? "Confirming order..." : "Confirm COD order"}
                            </button>
                        </aside>
                    </form>
                )}
            </div>
        </main>
    )
}

export default CheckoutPage
