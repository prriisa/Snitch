import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { fetchAllProducts } from "../api/productApi";
import ProductCard from "../components/Products/ProductCard";
import ProductCardSkeleton from "../components/Products/ProductCardSkeleton";
import Trending from "../components/Products/Trending";
import { filterProductsBySearch } from "../utils/productSearch"

export default function ProductsPage() {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchProducts = useCallback(async () => {
        const response = await fetchAllProducts()
        const allProducts = response.data?.data?.allProducts
        if (!Array.isArray(allProducts)) {
            throw new Error("The server returned an invalid product list.")
        }
        return allProducts
    }, [])

    useEffect(() => {
        let isMounted = true
        fetchProducts()
            .then((allProducts) => {
                if (!isMounted) return
                setProducts(allProducts)
                setError("")
            })
            .catch((requestError) => {
                if (isMounted) setError(requestError.response?.data?.message || requestError.message || "Could not load products.")
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })
        return () => { isMounted = false }
    }, [fetchProducts])

    const getProducts = async () => {
        setLoading(true)
        try {
            setProducts(await fetchProducts())
            setError("")
        } catch (requestError) {
            setError(requestError.response?.data?.message || requestError.message || "Could not load products.")
        } finally {
            setLoading(false)
        }
    }

    const search = new URLSearchParams(location.search).get("search") || ""
    const visibleProducts = useMemo(() => filterProductsBySearch(products, search), [products, search])

    return (
        <section className="w-full px-2 md:px-4 py-4">
            <Trending />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-3">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                    : visibleProducts.map((product) => (
                      <ProductCard key={product._id || product.id} product={product} />
                    ))}
            </div>
            {!loading && error && (
                <div role="alert" className="mx-auto my-8 flex max-w-xl flex-col items-center gap-3 text-center">
                    <p className="text-sm text-neutral-600">{error}</p>
                    <button type="button" onClick={() => { setLoading(true); getProducts() }} className="border border-black px-5 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white">Try again</button>
                </div>
            )}
            {!loading && !error && visibleProducts.length === 0 && (
                <p className="py-12 text-center text-sm uppercase tracking-widest text-neutral-500">
                    {search ? `No products found for "${search}".` : "No products available yet."}
                </p>
            )}
        </section>
    );
}