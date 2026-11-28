import { useCallback, useEffect, useState } from "react"
import { Bell, ChevronRight, RefreshCw } from "lucide-react"
import { Link } from "react-router"
import { fetchSellerNotifications, markSellerNotificationRead } from "../api/orderApi"

const formatPrice = (amount, currency) => {
    const formattedAmount = Number(amount || 0).toLocaleString("en-IN")
    return currency === "INR" ? `₹${formattedAmount}` : `${currency || ""} ${formattedAmount}`
}

const SellerNotificationsPage = () => {
    const [notifications, setNotifications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [updatingId, setUpdatingId] = useState("")

    const loadNotifications = useCallback(async () => {
        try {
            const response = await fetchSellerNotifications()
            const data = response.data?.data?.notifications
            if (!Array.isArray(data)) throw new Error("The server returned an invalid notifications list.")
            setNotifications(data)
            setError("")
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Could not load notifications.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const initialLoadId = window.setTimeout(loadNotifications, 0)
        const intervalId = window.setInterval(loadNotifications, 30000)
        return () => {
            window.clearTimeout(initialLoadId)
            window.clearInterval(intervalId)
        }
    }, [loadNotifications])

    const markAsRead = async (notificationId) => {
        setUpdatingId(notificationId)
        try {
            const response = await markSellerNotificationRead(notificationId)
            const updatedNotification = response.data?.data?.notification
            setNotifications((current) => current.map((item) => item._id === notificationId
                ? { ...item, readAt: updatedNotification?.readAt || new Date().toISOString() }
                : item))
            setError("")
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not update this notification.")
        } finally {
            setUpdatingId("")
        }
    }

    const unreadCount = notifications.filter((notification) => !notification.readAt).length

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-10 md:pt-32">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-black pb-6">
                    <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-neutral-500">Seller studio</p>
                        <h1 className="text-3xl font-semibold uppercase tracking-wide md:text-4xl">Notifications</h1>
                        <p className="mt-2 text-sm text-neutral-600">New order updates for your products.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {unreadCount > 0 && <span className="text-xs uppercase tracking-widest">{unreadCount} unread</span>}
                        <button type="button" onClick={loadNotifications} className="inline-flex items-center gap-2 border border-neutral-300 px-4 py-3 text-xs uppercase tracking-widest hover:border-black">
                            <RefreshCw size={14} /> Refresh
                        </button>
                    </div>
                </div>

                {error && (
                    <div role="alert" className="mb-5 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-28 animate-pulse bg-neutral-200" />)}
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="flex min-h-72 flex-col items-center justify-center bg-white px-6 text-center">
                        <Bell size={32} strokeWidth={1.4} />
                        <h2 className="mt-4 text-lg font-medium uppercase tracking-wide">No notifications yet</h2>
                        <p className="mt-2 text-sm text-neutral-500">New order notifications will appear here.</p>
                        <Link to="/seller/products" className="mt-5 text-xs uppercase tracking-widest underline hover:text-[#e64b2b]">Back to products</Link>
                    </div>
                ) : (
                    <div className="divide-y divide-neutral-200 bg-white">
                        {notifications.map((notification) => {
                            const order = notification.order && typeof notification.order === "object" ? notification.order : null
                            const orderId = order?._id || notification.order
                            const address = order?.shippingAddress

                            return (
                                <article key={notification._id} className={`p-5 ${notification.readAt ? "" : "border-l-4 border-[#e64b2b]"}`}>
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium">
                                                Order #{String(orderId || "").slice(-8).toUpperCase()} from {notification.customerName}
                                            </p>
                                            <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-500">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        {!notification.readAt && (
                                            <button
                                                type="button"
                                                onClick={() => markAsRead(notification._id)}
                                                disabled={updatingId === notification._id}
                                                className="text-[10px] uppercase tracking-widest underline hover:text-[#e64b2b] disabled:opacity-50"
                                            >
                                                {updatingId === notification._id ? "Updating..." : "Mark as read"}
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-3 divide-y divide-neutral-100">
                                        {notification.products?.map((item, index) => {
                                            const product = item.product && typeof item.product === "object" ? item.product : null
                                            const imageUrl = item.imageUrl || product?.images?.[0]?.url
                                            const unitPrice = item.unitPrice ?? product?.price?.amount
                                            const currency = item.currency || order?.currency || product?.price?.currency

                                            return (
                                                <div key={`${item.product?._id || item.product}-${item.size}-${index}`} className="flex items-center gap-3 py-3">
                                                    <div className="h-16 w-14 shrink-0 bg-neutral-100">
                                                        {imageUrl && <img src={imageUrl} alt={item.title || product?.title || "Product"} className="h-full w-full object-cover" />}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-medium uppercase">{item.title || product?.title || "Product unavailable"}</p>
                                                        <p className="mt-1 text-xs text-neutral-500">Size {item.size} · Qty {item.quantity}</p>
                                                    </div>
                                                    {unitPrice !== undefined && (
                                                        <span className="shrink-0 text-xs">{formatPrice(unitPrice * item.quantity, currency)}</span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {address && (
                                        <div className="mt-2 border-t border-neutral-200 pt-3 text-xs text-neutral-600">
                                            <p className="font-medium text-black">{address.fullName} · {address.phone}</p>
                                            <p className="mt-1">{[address.address, address.city, address.state, address.pincode].filter(Boolean).join(", ")}</p>
                                        </div>
                                    )}

                                    {orderId && (
                                        <Link to={`/seller/orders/${orderId}`} className="mt-4 inline-flex items-center gap-1 border-t border-neutral-200 pt-3 text-[10px] uppercase tracking-widest underline hover:text-[#e64b2b]">
                                            Open full order <ChevronRight size={14} />
                                        </Link>
                                    )}
                                </article>
                            )
                        })}
                    </div>
                )}
            </div>
        </main>
    )
}

export default SellerNotificationsPage
