import ProductCard from "../components/Products/ProductCard";
import ProductCardSkeleton from "../components/Products/ProductCardSkeleton";
import Trending from "../components/Products/Trending";

export default function ProductsPage({ loading = false }) {

    const products = [
        {
            id: 1,
            title: "Oversized Graphic T-Shirt",
            price: 999,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
            colors: ["#000000", "#FFFFFF", "#808080"],
            moreColors: 2,
        },
        {
            id: 2,
            title: "Relaxed Fit Cargo Pants",
            price: 1499,
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
            colors: ["#000000", "#C2B280"],
            moreColors: 1,
        },
        {
            id: 3,
            title: "Regular Fit Denim Jeans",
            price: 1299,
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
            colors: ["#1E3A5F", "#000000"],
            moreColors: 2,
        },
        {
            id: 4,
            title: "Minimal Oversized Shirt",
            price: 1199,
            image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
            colors: ["#FFFFFF", "#000000", "#D9C2A6"],
            moreColors: 1,
        },
        {
            id: 5,
            title: "Boxy Fit Printed T-Shirt",
            price: 899,
            image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
            colors: ["#FFFFFF", "#000000"],
            moreColors: 3,
        },
        {
            id: 6,
            title: "Wide Leg Utility Pants",
            price: 1599,
            image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
            colors: ["#556B2F", "#000000"],
            moreColors: 2,
        },
        {
            id: 7,
            title: "Classic Cotton Shirt",
            price: 1099,
            image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
            colors: ["#FFFFFF", "#87CEEB"],
            moreColors: 1,
        },
        {
            id: 8,
            title: "Relaxed Fit Sweatshirt",
            price: 1399,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
            colors: ["#808080", "#000000", "#FFFFFF"],
            moreColors: 2,
        },
    ];
    return (
        <section className="w-full px-2 md:px-4 py-4">
            <Trending />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-1 gap-y-3">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                    : products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </section>
    );
}