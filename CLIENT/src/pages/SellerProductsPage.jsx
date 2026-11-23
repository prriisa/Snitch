import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router"
import { PackagePlus, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react"
import { deleteProduct, fetchAllProducts } from "../api/productApi"
import { fetchSellerProductSales } from "../api/orderApi"
import { useSelector } from "react-redux"
import ProductImageCarousel from "../components/Products/ProductImageCarousel"

const SellerProductsPage = () => {
    const user = useSelector((state) => state.auth.user)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [deletingId, setDeletingId] = useState("")
    const [selectedProductId, setSelectedProductId] = useState("")
    const [salesByProductId, setSalesByProductId] = useState({})
    const [salesLoadingId, setSalesLoadingId] = useState("")
    const [salesError, setSalesError] = useState("")

    const fetchProducts = useCallback(async () => {
        const response = await fetchAllProducts()
        const allProducts = response.data?.data?.allProducts
        if (!Array.isArray(allProducts)) {
            throw new Error("The server returned an invalid product list.")
        }
        return allProducts.filter((product) => String(product.seller?._id || product.seller) === String(user?.id))
    }, [user?.id])

    useEffect(() => {
        let isMounted = true
        fetchProducts()
            .then((allProducts) => {
                if (!isMounted) return
                setProducts(allProducts)
                setError("")
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || requestError.message || "Could not load your products.")
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            })
        return () => { isMounted = false }
    }, [fetchProducts])

    const loadProducts = async () => {
        setIsLoading(true)
        try {
            setProducts(await fetchProducts())
            setError("")
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Could not load your products.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (product) => {
        if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) return
        setDeletingId(product._id)
        setError("")
        try {
            await deleteProduct(product._id)
            setProducts((current) => current.filter((item) => item._id !== product._id))
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not delete this product. Please try again.")
        } finally {
            setDeletingId("")
        }
    }

    const toggleSales = async (productId) => {
        if (selectedProductId === productId) {
            setSelectedProductId("")
            return
        }
        setSelectedProductId(productId)
        setSalesError("")

        setSalesLoadingId(productId)
        try {
            const response = await fetchSellerProductSales(productId)
            setSalesByProductId((current) => ({ ...current, [productId]: response.data?.data?.sales || { totalSold: 0, totalAvailable: 0, bySize: [] } }))
        } catch (requestError) {
            setSalesError(requestError.response?.data?.message || "Could not load stock and sales for this product.")
        } finally {
            setSalesLoadingId("")
        }
    }

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-10 md:pt-32">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-black pb-6">
                    <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-neutral-500">Seller studio</p>
                        <h1 className="text-3xl font-semibold uppercase tracking-wide md:text-4xl">Your products</h1>
                        <p className="mt-2 text-sm text-neutral-600">Manage the products listed in your Snitch store.</p>
                    </div>
                    <Link to="/seller/create-product" className="inline-flex items-center gap-2 bg-black px-5 py-3 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-[#e64b2b]">
                        <Plus size={16} /> Add product
                    </Link>
                </div>

                {error && (
                    <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                        <span>{error}</span>
                        <button type="button" onClick={() => { setIsLoading(true); loadProducts() }} className="inline-flex items-center gap-2 font-semibold uppercase tracking-wide">
                            <RefreshCw size={14} /> Try again
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-72 animate-pulse bg-neutral-200" />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex min-h-80 flex-col items-center justify-center bg-white px-6 text-center">
                        <PackagePlus size={38} strokeWidth={1.2} />
                        <h2 className="mt-4 text-xl font-medium uppercase tracking-wide">Your catalogue is empty</h2>
                        <p className="mt-2 max-w-md text-sm text-neutral-500">Add your first product and it will be available in your store.</p>
                        <Link to="/seller/create-product" className="mt-6 bg-black px-5 py-3 text-xs uppercase tracking-widest text-white hover:bg-[#e64b2b]">Create your first product</Link>
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-xs uppercase tracking-widest text-neutral-500">{products.length} {products.length === 1 ? "product" : "products"}</p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <article key={product._id} className="overflow-hidden bg-white">
                                    <Link to={`/product/${product._id}`} aria-label={`View ${product.title}`} className="block">
                                        <ProductImageCarousel images={product.images || []} title={product.title} className="aspect-[220/296]" />
                                    </Link>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <Link to={`/product/${product._id}`} className="block truncate text-sm font-medium uppercase hover:underline">{product.title}</Link>
                                                <p className="mt-1 text-sm text-neutral-600">
                                                    {product.price?.currency === "INR" ? "₹" : `${product.price?.currency || ""} `}
                                                    {product.price?.amount}
                                                </p>
                                            </div>
                                            <span className="shrink-0 text-[10px] uppercase tracking-wider text-neutral-500">{product.sizes?.length || 0} sizes</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => toggleSales(product._id)}
                                            aria-expanded={selectedProductId === product._id}
                                            className="mt-4 w-full border border-neutral-300 px-3 py-2 text-[11px] uppercase tracking-widest hover:border-black"
                                        >
                                            {selectedProductId === product._id ? "Hide inventory & sales" : "View inventory & sales"}
                                        </button>
                                        {selectedProductId === product._id && (
                                            <div className="mt-3 border-t border-neutral-200 pt-3">
                                                {salesLoadingId === product._id ? (
                                                    <p className="py-3 text-center text-xs uppercase tracking-widest text-neutral-500">Loading sales...</p>
                                                ) : salesError ? (
                                                    <p role="alert" className="py-2 text-xs text-red-700">{salesError}</p>
                                                ) : (
                                                    <>
                                                        <div className="mb-3 grid grid-cols-2 gap-2">
                                                            <div className="bg-neutral-100 p-3">
                                                                <p className="text-[10px] uppercase tracking-widest text-neutral-500">Available stock</p>
                                                                <p className="mt-1 text-lg font-semibold">{salesByProductId[product._id]?.totalAvailable || 0}</p>
                                                            </div>
                                                            <div className="bg-neutral-100 p-3">
                                                                <p className="text-[10px] uppercase tracking-widest text-neutral-500">Units sold</p>
                                                                <p className="mt-1 text-lg font-semibold">{salesByProductId[product._id]?.totalSold || 0}</p>
                                                            </div>
                                                        </div>
                                                        <p className="mb-2 text-[10px] text-neutral-500">Sold units are from placed orders; cancelled and returned orders are excluded.</p>
                                                        <div className="grid grid-cols-3 border-b border-neutral-300 pb-2 text-[10px] font-medium uppercase tracking-widest text-neutral-500">
                                                            <span>Size</span><span className="text-center">Available</span><span className="text-right">Sold</span>
                                                        </div>
                                                        {(salesByProductId[product._id]?.bySize || []).map((item) => {
                                                            return (
                                                                <div key={item.size} className="grid grid-cols-3 border-b border-neutral-100 py-2 text-xs">
                                                                    <span>{item.size}</span><span className="text-center">{item.stock}</span><span className="text-right">{item.quantitySold}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <div className="mt-4 flex gap-2 border-t border-neutral-200 pt-3">
                                            <Link to={`/product/${product._id}`} className="inline-flex flex-1 items-center justify-center border border-neutral-300 px-3 py-2 text-[11px] uppercase tracking-widest hover:border-black">
                                                View
                                            </Link>
                                            <Link to={`/seller/products/${product._id}/edit`} className="inline-flex flex-1 items-center justify-center gap-2 border border-black px-3 py-2 text-[11px] uppercase tracking-widest hover:bg-black hover:text-white">
                                                <Pencil size={14} /> Edit
                                            </Link>
                                            <button type="button" onClick={() => handleDelete(product)} disabled={deletingId === product._id} className="inline-flex flex-1 items-center justify-center gap-2 border border-neutral-300 px-3 py-2 text-[11px] uppercase tracking-widest hover:border-red-600 hover:text-red-600 disabled:opacity-50">
                                                <Trash2 size={14} /> {deletingId === product._id ? "Deleting..." : "Delete"}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}

export default SellerProductsPage
