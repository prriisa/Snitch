import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { fetchCart, removeCartItem, updateCartQuantity, updateCartSize } from "../api/cartApi"
import { setToast } from "../redux/Slice/toastSlice"
import { calculateOrderFees } from "../utils/orderFees"

const formatPrice = (amount, currency) => {
    const formattedAmount = Number(amount || 0).toLocaleString("en-IN")
    return currency === "INR" ? `₹${formattedAmount}` : `${currency || ""} ${formattedAmount}`
}

const CartPage = () => {
    const userId = useSelector((state) => state.auth.user?.id)
    const isAuthLoading = useSelector((state) => state.auth.isLoading)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [selectedItemIds, setSelectedItemIds] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [updatingItemId, setUpdatingItemId] = useState("")
    const [error, setError] = useState("")

    const requestCart = useCallback(async () => {
        try {
            const response = await fetchCart()
            return response.data?.data?.products || []
        } catch (requestError) {
            if (requestError.response?.status === 404) return []
            throw requestError
        }
    }, [])

    useEffect(() => {
        if (!userId) return undefined
        let isMounted = true
        requestCart()
            .then((cartItems) => {
                if (!isMounted) return
                setItems(cartItems)
                setSelectedItemIds(cartItems.map((item) => item._id))
                setError("")
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || "Could not load your bag. Please try again.")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })
        return () => { isMounted = false }
    }, [userId, requestCart])

    const loadCart = async () => {
        setIsLoading(true)
        try {
            const cartItems = await requestCart()
            setItems(cartItems)
            setSelectedItemIds((current) => current.filter((id) => cartItems.some((item) => item._id === id)))
            setError("")
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not load your bag. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const selectedItems = items.filter((item) => selectedItemIds.includes(item._id))
    const currency = selectedItems.find((item) => item.product)?.product?.price?.currency || "INR"
    const hasMixedCurrencies = selectedItems.some((item) => item.product && item.product.price?.currency !== currency)
    const total = selectedItems.reduce((sum, item) => {
        return sum + (item.product?.price?.amount || 0) * item.quantity
    }, 0)
    const fees = calculateOrderFees(total, currency)
    const hasUnavailableProduct = selectedItems.some((item) => !item.product)
    const hasInsufficientStock = selectedItems.some((item) => {
        const selectedSize = item.product?.sizes?.find((entry) => entry.size === item.size)
        return !selectedSize || selectedSize.stock < item.quantity
    })
    const allItemsSelected = items.length > 0 && selectedItemIds.length === items.length
    const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0)

    const changeQuantity = async (item, action) => {
        setUpdatingItemId(item._id)
        setError("")
        try {
            await updateCartQuantity(item._id, action)
            await loadCart()
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not update this item's quantity.")
        } finally {
            setUpdatingItemId("")
        }
    }

    const changeSize = async (item, size) => {
        setUpdatingItemId(item._id)
        setError("")
        try {
            await updateCartSize(item._id, size)
            await loadCart()
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not update this item's size.")
        } finally {
            setUpdatingItemId("")
        }
    }

    const removeItem = async (item) => {
        setUpdatingItemId(item._id)
        setError("")
        try {
            await removeCartItem(item._id)
            await loadCart()
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not remove this item from your bag.")
        } finally {
            setUpdatingItemId("")
        }
    }

    const toggleItem = (itemId) => setSelectedItemIds((current) => current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId])

    const goToCheckout = () => {
        if (!selectedItems.length) {
            dispatch(setToast({ success: false, message: "Select at least one product to continue." }))
            return
        }
        if (hasMixedCurrencies || hasUnavailableProduct || hasInsufficientStock) return
        navigate("/checkout", { state: { selectedItemIds } })
    }

    if (!userId && isAuthLoading) {
        return <main className="min-h-screen bg-white pt-32 text-center text-xs uppercase tracking-widest text-neutral-500">Loading your bag...</main>
    }

    if (!userId) {
        return (
            <main className="flex min-h-[75vh] flex-col items-center justify-center bg-white px-6 pt-24 text-center">
                <ShoppingBag size={38} strokeWidth={1.2} />
                <h1 className="mt-4 text-2xl font-semibold uppercase">Your bag</h1>
                <p className="mt-2 text-sm text-neutral-600">Sign in to view and manage your bag.</p>
                <Link to="/login" className="mt-6 bg-black px-8 py-3 text-xs uppercase tracking-widest text-white">Sign in</Link>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-white px-4 pb-24 pt-24 text-black md:px-[6vw] md:pt-32">
            <div className="mx-auto max-w-7xl">
                <div className="mb-7 border-b border-black/10 pb-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Snitch</p>
                    <h1 className="mt-1 text-3xl font-semibold uppercase tracking-wide md:text-4xl">Your bag</h1>
                </div>

                {error && <p role="alert" className="mb-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

                {isLoading ? (
                    <div className="h-52 animate-pulse bg-neutral-100" />
                ) : items.length === 0 ? (
                    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                        <ShoppingBag size={42} strokeWidth={1.1} />
                        <h2 className="mt-4 text-xl font-medium uppercase">Your bag is empty</h2>
                        <p className="mt-2 text-sm text-neutral-500">Find something you love and it will be waiting here.</p>
                        <Link to="/shop" className="mt-6 bg-black px-8 py-3 text-xs uppercase tracking-widest text-white">Start shopping</Link>
                    </div>
                ) : (
                    <section aria-label="Bag items" className="divide-y divide-neutral-200 border-t border-neutral-200">
                        <label className="flex items-center gap-3 border-b border-neutral-200 py-4 text-xs uppercase tracking-widest">
                            <input type="checkbox" checked={allItemsSelected} onChange={(event) => setSelectedItemIds(event.target.checked ? items.map((item) => item._id) : [])} className="h-4 w-4 accent-black" />
                            Select all ({items.length} {items.length === 1 ? "product" : "products"})
                        </label>
                        {items.map((item) => {
                            const product = item.product
                            const image = product?.images?.[0]?.url
                            const selectedSize = product?.sizes?.find((entry) => entry.size === item.size)
                            const availableSizes = product?.sizes?.filter((entry) => entry.stock > 0) || []

                            return (
                                <article key={item._id} className="flex gap-3 py-5 md:gap-4">
                                    <input type="checkbox" aria-label={`Select ${product?.title || "product"}`} checked={selectedItemIds.includes(item._id)} onChange={() => toggleItem(item._id)} className="mt-2 h-4 w-4 shrink-0 accent-black" />
                                    <Link to={product?._id ? `/product/${product._id}` : "/shop"} className="h-36 w-28 shrink-0 bg-neutral-100 md:h-44 md:w-36">
                                        {image && <img src={image} alt={product.title} loading="lazy" className="h-full w-full object-cover" />}
                                    </Link>
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h2 className="truncate text-sm font-medium uppercase">{product?.title || "Unavailable product"}</h2>
                                                {product && <p className="mt-1 text-sm">{formatPrice(product.price?.amount, product.price?.currency)}</p>}
                                            </div>
                                            <button type="button" onClick={() => removeItem(item)} disabled={updatingItemId === item._id} aria-label="Remove item" className="p-1 text-neutral-500 hover:text-red-600 disabled:opacity-50">
                                                <Trash2 size={17} />
                                            </button>
                                        </div>

                                        {product && (
                                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                                                <label className="flex items-center gap-2">
                                                    <span className="text-neutral-500">Size</span>
                                                    <select value={item.size} onChange={(event) => changeSize(item, event.target.value)} disabled={updatingItemId === item._id} className="border border-neutral-300 bg-white px-2 py-1.5">
                                                        {availableSizes.map((entry) => <option key={entry.size} value={entry.size}>{entry.size}</option>)}
                                                        {selectedSize?.stock === 0 && <option value={item.size} disabled>{item.size} (out of stock)</option>}
                                                    </select>
                                                </label>
                                                {selectedSize && selectedSize.stock < 8 && (
                                                    <span className="font-medium text-red-600">
                                                        {selectedSize.stock > 0 ? `Only ${selectedSize.stock} left` : "Out of stock"}
                                                    </span>
                                                )}
                                                <div className="inline-flex items-center border border-neutral-300">
                                                    <button type="button" onClick={() => changeQuantity(item, "decrement")} disabled={updatingItemId === item._id || item.quantity <= 1} aria-label="Decrease quantity" className="p-2 disabled:opacity-40"><Minus size={13} /></button>
                                                    <span className="min-w-8 text-center">{item.quantity}</span>
                                                    <button type="button" onClick={() => changeQuantity(item, "increment")} disabled={updatingItemId === item._id || !selectedSize || item.quantity >= selectedSize.stock} aria-label="Increase quantity" className="p-2 disabled:opacity-40"><Plus size={13} /></button>
                                                </div>
                                            </div>
                                        )}
                                        {selectedSize && item.quantity > selectedSize.stock && <p className="mt-2 text-xs text-red-700">Only {selectedSize.stock} left in this size. Update your quantity.</p>}
                                    </div>
                                </article>
                            )
                        })}
                    </section>
                )}

                {!isLoading && items.length > 0 && (
                    <section className="mt-7 border border-neutral-200 bg-white p-5 shadow-sm md:p-7">
                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Order summary</p>
                                <p className="mt-2 text-sm text-neutral-600">
                                    {selectedItems.length} selected {selectedItems.length === 1 ? "product" : "products"}
                                    <span className="mx-2 text-neutral-300">|</span>
                                    {selectedQuantity} {selectedQuantity === 1 ? "item" : "items"}
                                </p>
                                <p className="mt-3 text-xs text-neutral-500">Delivery and payment details are next.</p>
                                {hasMixedCurrencies && <p className="mt-2 text-xs text-red-700">Select products with the same currency to check out together.</p>}
                                {hasInsufficientStock && <p className="mt-2 text-xs text-red-700">Selected quantity exceeds current stock. Update your bag before checkout.</p>}
                                {hasUnavailableProduct && <p className="mt-2 text-xs text-red-700">Remove unavailable products before checkout.</p>}
                            </div>
                            <div className="flex flex-col gap-3 md:min-w-64">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between gap-6"><span className="text-neutral-500">Subtotal</span><span>{formatPrice(total, currency)}</span></div>
                                    {currency === "INR" && (
                                        <>
                                            <div className="flex justify-between gap-6"><span className="text-neutral-500">Platform fee</span><span>{formatPrice(fees.platformFee, currency)}</span></div>
                                            <div className="flex justify-between gap-6"><span className="text-neutral-500">Delivery</span><span>{fees.deliveryFee ? formatPrice(fees.deliveryFee, currency) : "Free"}</span></div>
                                        </>
                                    )}
                                    <div className="flex justify-between gap-6 border-t border-neutral-200 pt-2 font-semibold"><span>Total</span><span>{formatPrice(fees.totalAmount, currency)}</span></div>
                                </div>
                                <button type="button" onClick={goToCheckout} disabled={!selectedItems.length || hasMixedCurrencies || hasUnavailableProduct || hasInsufficientStock} className="flex w-full items-center justify-center gap-2 bg-black px-7 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-[#e64b2b] disabled:cursor-not-allowed disabled:opacity-40">
                                    Order now <ArrowRight size={15} />
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}

export default CartPage
