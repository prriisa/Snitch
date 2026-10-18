import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import WishlistProductCardSkeleton from "../components/WishList/WishlistProductCardSkeleton.jsx"
import { fetchWishlist } from "../api/wishlistApi.jsx"
import WishlistProductCard from "../components/WishList/WishlistProductCard.jsx"
import NotLoginWishList from "../components/WishList/NotLoginWishList.jsx"

const WishListPage = () => {
  const user = useSelector((state) => state.auth.user)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setItems([])
      setIsLoading(false)
      return
    }

    const loadWishlist = async () => {
      try {
        setIsLoading(true)
        const { data } = await fetchWishlist()
        setItems(data?.data?.products || data?.products || [])
      } catch (error) {
        console.error("Failed to fetch wishlist:", error)
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }

    loadWishlist()
  }, [user])

  const removeItem = (id) => {
    setItems((prev) => prev.filter((product) => product._id !== id))
  }

  if (!user) return <NotLoginWishList />

  if (!isLoading && items.length === 0) {
    return <NotLoginWishList isEmpty />
  }

  return (
    <main className="w-full bg-white pt-25">
      {!isLoading && items.length > 0 && (
        <div className="hidden max-w-full bg-white md:block">
          <div className="mx-[90px] flex items-center justify-between border-b border-black/10 py-3">
            <h1 className="w-fit text-[36px] font-bold uppercase leading-none text-black">
              Wishlist
            </h1>
          </div>
        </div>
      )}

      <div className="w-full md:px-[90px] md:pt-3">
        <div className="grid grid-cols-2 gap-x-1 gap-y-3 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }, (_, i) => (
                <WishlistProductCardSkeleton key={i} />
              ))
            : items.map((product) => (
                <WishlistProductCard
                  key={product._id}
                  product={product}
                  onRemove={removeItem}
                />
              ))}
        </div>
      </div>
    </main>
  )
}

export default WishListPage