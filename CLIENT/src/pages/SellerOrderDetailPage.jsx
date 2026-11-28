import { useEffect, useState } from "react"
import { ChevronLeft, PackageCheck } from "lucide-react"
import { Link, useParams } from "react-router"
import { fetchSellerOrder } from "../api/orderApi"

const formatPrice = (amount, currency) => {
    const formattedAmount = Number(amount || 0).toLocaleString("en-IN")
    return currency === "INR" ? `₹${formattedAmount}` : `${currency || ""} ${formattedAmount}`
}

const SellerOrderDetailPage = () => {
    const { orderId } = useParams()
    const [notification, setNotification] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        let isMounted = true
        fetchSellerOrder(orderId)
            .then((response) => {
                if (!isMounted) return
                const data = response.data?.data?.notification
                if (data?.order) setNotification(data)
                else setError("Order not found.")
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || "Could not load this order.")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })
        return () => { isMounted = false }
    }, [orderId])

    if (isLoading) {
        return <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-32"><div className="mx-auto h-96 max-w-5xl animate-pulse bg-neutral-200" /></main>
    }

    if (error || !notification?.order) {
        return (
            <main className="min-h-[65vh] bg-[#f7f7f7] px-4 pb-24 pt-32 text-black">
                <div className="mx-auto max-w-5xl bg-white p-6">
                    <p role="alert" className="text-sm text-red-700">{error || "Order not found."}</p>
                    <Link to="/seller/notifications" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest underline">
                        <ChevronLeft size={15} /> Back to notifications
                    </Link>
                </div>
            </main>
        )
    }

    const order = notification.order
    const address = order.shippingAddress

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-8 md:pt-32">
            <div className="mx-auto max-w-5xl">
                <Link to="/seller/notifications" className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-600 hover:text-black">
                    <ChevronLeft size={16} /> Back to notifications
                </Link>
                <header className="mb-7 border-b border-black/10 pb-5">
                    <div className="flex items-center gap-3">
                        <PackageCheck size={24} />
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Order details</p>
                            <h1 className="mt-1 text-2xl font-semibold uppercase md:text-3xl">#{String(order._id || orderId).slice(-8).toUpperCase()}</h1>
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-neutral-500">
                        Placed {new Date(order.createdAt || notification.createdAt).toLocaleString()}
                    </p>
                </header>

                <div className="grid items-start gap-5 md:grid-cols-[1.4fr_0.8fr]">
                    <section className="bg-white p-5 shadow-sm md:p-7">
                        <h2 className="border-b border-neutral-200 pb-4 text-sm font-semibold uppercase tracking-widest">
                            Ordered products ({notification.products?.length || 0})
                        </h2>
                        <div className="divide-y divide-neutral-100">
                            {notification.products?.map((item, index) => {
                                const product = item.product && typeof item.product === "object" ? item.product : null
                                const imageUrl = item.imageUrl || product?.images?.[0]?.url
                                const title = item.title || product?.title || "Product unavailable"
                                const unitPrice = item.unitPrice ?? product?.price?.amount
                                const currency = item.currency || order.currency || product?.price?.currency
                                const itemTotal = unitPrice === undefined ? null : unitPrice * item.quantity
                                const productId = product?._id
                                const content = (
                                    <>
                                        <div className="h-24 w-20 shrink-0 bg-neutral-100">
                                            {imageUrl && <img src={imageUrl} alt={title} className="h-full w-full object-cover" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium uppercase">{title}</p>
                                            <p className="mt-2 text-xs text-neutral-600">Size: {item.size}</p>
                                            <p className="mt-1 text-xs text-neutral-600">Quantity: {item.quantity}</p>
                                            {unitPrice !== undefined && <p className="mt-2 text-xs text-neutral-500">Unit price: {formatPrice(unitPrice, currency)}</p>}
                                        </div>
                                        {itemTotal !== null && <p className="shrink-0 text-sm font-medium">{formatPrice(itemTotal, currency)}</p>}
                                    </>
                                )

                                return productId ? (
                                    <Link key={`${productId}-${item.size}-${index}`} to={`/product/${productId}`} className="flex gap-4 py-4 hover:bg-neutral-50">
                                        {content}
                                    </Link>
                                ) : (
                                    <div key={`${item.product}-${item.size}-${index}`} className="flex gap-4 py-4">{content}</div>
                                )
                            })}
                        </div>
                    </section>

                    <aside className="space-y-5">
                        <section className="bg-white p-5 shadow-sm">
                            <h2 className="border-b border-neutral-200 pb-3 text-sm font-semibold uppercase tracking-widest">Customer & delivery address</h2>
                            <address className="mt-4 space-y-1 text-sm not-italic">
                                <p className="font-medium">{address?.fullName || notification.customerName}</p>
                                <p>{address?.phone}</p>
                                <p>{address?.address}</p>
                                <p>{[address?.city, address?.state, address?.pincode].filter(Boolean).join(", ")}</p>
                            </address>
                        </section>

                        <section className="bg-white p-5 shadow-sm">
                            <h2 className="border-b border-neutral-200 pb-3 text-sm font-semibold uppercase tracking-widest">Payment & total</h2>
                            <div className="mt-4 space-y-3 text-sm">
                                <div className="flex justify-between gap-4"><span className="text-neutral-600">Payment method</span><span>Cash on delivery</span></div>
                                <div className="flex justify-between gap-4"><span className="text-neutral-600">Subtotal</span><span>{formatPrice(order.subtotalAmount, order.currency)}</span></div>
                                <div className="flex justify-between gap-4"><span className="text-neutral-600">Platform fee</span><span>{formatPrice(order.platformFee, order.currency)}</span></div>
                                <div className="flex justify-between gap-4"><span className="text-neutral-600">Delivery</span><span>{order.deliveryFee ? formatPrice(order.deliveryFee, order.currency) : "Free"}</span></div>
                                <div className="flex justify-between gap-4 border-t border-neutral-200 pt-3 text-base font-semibold"><span>Total</span><span>{formatPrice(order.totalAmount, order.currency)}</span></div>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export default SellerOrderDetailPage
