import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { ChevronLeft, PackageCheck } from "lucide-react"
import { fetchMyOrders } from "../api/orderApi"

const formatPrice = (amount, currency) => {
    const formattedAmount = Number(amount || 0).toLocaleString("en-IN")
    return currency === "INR" ? `₹${formattedAmount}` : `${currency || ""} ${formattedAmount}`
}

const OrderDetailPage = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        let isMounted = true
        fetchMyOrders()
            .then((response) => {
                if (!isMounted) return
                const foundOrder = response.data?.data?.orders?.find((item) => item._id === orderId)
                if (foundOrder) setOrder(foundOrder)
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
        return <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-32"><div className="mx-auto h-96 max-w-4xl animate-pulse bg-neutral-200" /></main>
    }

    if (error || !order) {
        return (
            <main className="min-h-[65vh] bg-[#f7f7f7] px-4 pb-24 pt-32 text-black">
                <div className="mx-auto max-w-4xl bg-white p-6">
                    <p role="alert" className="text-sm text-red-700">{error || "Order not found."}</p>
                    <Link to="/orders" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest underline"><ChevronLeft size={15} /> Back to orders</Link>
                </div>
            </main>
        )
    }

    const address = order.shippingAddress

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-8 md:pt-32">
            <div className="mx-auto max-w-5xl">
                <Link to="/orders" className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-600 hover:text-black">
                    <ChevronLeft size={16} /> Back to orders
                </Link>
                <header className="mb-7 border-b border-black/10 pb-5">
                    <div className="flex items-center gap-3">
                        <PackageCheck size={24} />
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Order details</p>
                            <h1 className="mt-1 text-2xl font-semibold uppercase md:text-3xl">#{order._id.slice(-8).toUpperCase()}</h1>
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-neutral-500">Placed {new Date(order.createdAt).toLocaleString()}</p>
                </header>

                <div className="grid items-start gap-5 md:grid-cols-[1.4fr_0.8fr]">
                    <section className="bg-white p-5 shadow-sm md:p-7">
                        <h2 className="border-b border-neutral-200 pb-4 text-sm font-semibold uppercase tracking-widest">
                            Ordered products ({order.product?.length || 0})
                        </h2>
                        <div className="divide-y divide-neutral-100">
                            {order.product?.map((item, index) => {
                                const product = item.product
                                const itemTotal = (product?.price?.amount || 0) * item.quantity
                                const row = (
                                    <>
                                        <div className="h-24 w-20 shrink-0 bg-neutral-100">
                                            {product?.images?.[0]?.url && <img src={product.images[0].url} alt={product.title || "Product"} className="h-full w-full object-cover" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium uppercase">{product?.title || "Product unavailable"}</p>
                                            <p className="mt-2 text-xs text-neutral-600">Size: {item.size}</p>
                                            <p className="mt-1 text-xs text-neutral-600">Quantity: {item.quantity}</p>
                                            {product?.price?.amount !== undefined && <p className="mt-2 text-xs text-neutral-500">Unit price: {formatPrice(product.price.amount, order.currency)}</p>}
                                        </div>
                                        <p className="shrink-0 text-sm font-medium">{formatPrice(itemTotal, order.currency)}</p>
                                    </>
                                )
                                return product?._id ? (
                                    <Link key={`${product._id}-${item.size}-${index}`} to={`/product/${product._id}`} className="flex gap-4 py-4 hover:bg-neutral-50">
                                        {row}
                                    </Link>
                                ) : (
                                    <div key={`unavailable-${index}`} className="flex gap-4 py-4">{row}</div>
                                )
                            })}
                        </div>
                    </section>

                    <aside className="space-y-5">
                        <section className="bg-white p-5 shadow-sm">
                            <h2 className="border-b border-neutral-200 pb-3 text-sm font-semibold uppercase tracking-widest">Delivery address</h2>
                            <address className="mt-4 space-y-1 text-sm not-italic">
                                <p className="font-medium">{address?.fullName}</p>
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

export default OrderDetailPage
