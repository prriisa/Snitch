import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/productApi";
import ProductCard from "../components/Products/ProductCard";
import ProductCardSkeleton from "../components/Products/ProductCardSkeleton";
import Trending from "../components/Products/Trending";

export default function ProductsPage({ loading = false }) {

const [products, setProducts] = useState()

    const getProducts = async () => {
        const response = await fetchAllProducts()
        console.log(response.data.data.allProducts)
        setProducts(response.data.data.allProducts)
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <section className="w-full px-2 md:px-4 py-4">
            <Trending />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-3">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                    : products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </section>
    );
}