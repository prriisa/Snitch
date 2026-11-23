import { useEffect, useState } from "react"
import { Link } from "react-router"
import { LoaderCircle, PackageCheck } from "lucide-react"
import { cancelOrder, fetchMyOrders } from "../api/orderApi"

const formatPrice = (amount, currency) => {
    const formattedAmount = Number(amount || 0).toLocaleString("en-IN")
    return currency === "INR" ? `₹${formattedAmount}` : `${currency || ""} ${formattedAmount}`
}

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [cancellingOrderId, setCancellingOrderId] = useState("")

    useEffect(() => {
        let isMounted = true
        fetchMyOrders()
            .then((response) => {
                if (isMounted) setOrders(response.data?.data?.orders || [])
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || "Could not load your orders.")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })
        return () => { isMounted = false }
    }, [])

    const handleCancelOrder = async (order) => {
        if (!window.confirm("Cancel this order? The items will be returned to your bag stock.")) return

        setError("")
        setCancellingOrderId(order._id)
        try {
            const response = await cancelOrder(order._id)
            const updatedStatus = response.data?.data?.order?.orderStatus
            setOrders((current) => current.map((item) => item._id === order._id
                ? { ...item, orderStatus: updatedStatus || "CANCELLED" }
                : item))
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not cancel this order.")
        } finally {
            setCancellingOrderId("")
        }
    }

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-8 md:pt-32">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 border-b border-black/10 pb-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Your account</p>
                    <h1 className="mt-2 text-3xl font-semibold uppercase tracking-wide md:text-4xl">Your orders</h1>
                </div>

                {error && <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
                {isLoading ? (
                    <div className="space-y-4">{[1, 2].map((item) => <div key={item} className="h-40 animate-pulse bg-neutral-200" />)}</div>
                ) : !orders.length ? (
                    <div className="flex min-h-72 flex-col items-center justify-center bg-white text-center">
                        <PackageCheck size={38} strokeWidth={1.2} />
                        <h2 className="mt-4 text-lg font-medium uppercase">No orders yet</h2>
                        <p className="mt-2 text-sm text-neutral-500">Your confirmed orders will appear here.</p>
                        <Link to="/shop" className="mt-5 bg-black px-6 py-3 text-xs uppercase tracking-widest text-white">Explore the collection</Link>
                    </div>
                ) : (
                    <div className="orders-page-enter space-y-4">
                        {orders.map((order) => (
                            <article key={order._id} className="bg-white p-5 shadow-sm md:p-6">
                                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-200 pb-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-neutral-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                                        <p className="mt-1 text-xs text-neutral-500">{new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`border px-3 py-2 text-[10px] font-semibold uppercase tracking-widest ${order.orderStatus === "CANCELLED" ? "border-red-300 bg-red-50 text-red-700" : order.orderStatus === "RETURNED" ? "border-neutral-300 bg-neutral-100 text-neutral-700" : "border-green-300 bg-green-50 text-green-800"}`}>
                                            Order status: {order.orderStatus === "CANCELLED" ? "Cancelled" : order.orderStatus === "RETURNED" ? "Returned" : "Confirmed"}
                                        </div>
                                        {["PLACED", "CONFIRMED"].includes(order.orderStatus) && (
                                            <button type="button" onClick={() => handleCancelOrder(order)} disabled={cancellingOrderId === order._id} className="inline-flex items-center gap-2 border border-neutral-300 px-3 py-2 text-[10px] font-medium uppercase tracking-widest hover:border-red-600 hover:text-red-700 disabled:opacity-50">
                                                {cancellingOrderId === order._id && <LoaderCircle size={13} className="animate-spin" />}
                                                {cancellingOrderId === order._id ? "Cancelling..." : "Cancel order"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="divide-y divide-neutral-100">
                                    {order.product?.map((item, index) => (
                                        item.product?._id ? (
                                            <Link key={`${item.product._id}-${item.size}-${index}`} to={`/product/${item.product._id}`} className="flex items-center gap-3 py-3 hover:bg-neutral-50">
                                                <div className="h-16 w-14 shrink-0 bg-neutral-100">
                                                    {item.product.images?.[0]?.url && <img src={item.product.images[0].url} alt={item.product.title || "Product"} className="h-full w-full object-cover" />}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs font-medium uppercase">{item.product.title || "Product"}</p>
                                                    <p className="mt-1 text-xs text-neutral-500">Size {item.size} · Qty {item.quantity}</p>
                                                </div>
                                                <span className="text-xs">{formatPrice((item.product.price?.amount || 0) * item.quantity, order.currency)}</span>
                                            </Link>
                                        ) : (
                                            <div key={`unavailable-${item.size}-${index}`} className="flex items-center gap-3 py-3">
                                                <div className="h-16 w-14 shrink-0 bg-neutral-100" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-medium uppercase">Product unavailable</p>
                                                    <p className="mt-1 text-xs text-neutral-500">Size {item.size} · Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <div className="flex flex-wrap justify-between gap-2 border-t border-neutral-200 pt-4 text-sm">
                                    <span className="text-neutral-600">Cash on delivery · {order.paymentStatus}</span>
                                    <div className="space-y-1 text-right">
                                        {order.subtotalAmount !== undefined && <p className="text-xs text-neutral-500">Subtotal {formatPrice(order.subtotalAmount, order.currency)}</p>}
                                        {order.platformFee !== undefined && <p className="text-xs text-neutral-500">Platform fee {formatPrice(order.platformFee, order.currency)}</p>}
                                        {order.deliveryFee !== undefined && <p className="text-xs text-neutral-500">Delivery {order.deliveryFee ? formatPrice(order.deliveryFee, order.currency) : "Free"}</p>}
                                        <p className="font-semibold">Total {formatPrice(order.totalAmount, order.currency)}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default OrdersPage
