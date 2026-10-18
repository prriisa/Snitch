
import { useState } from "react"
import { Heart } from "lucide-react"
import { useNavigate } from "react-router"
import { removeWishlistItem } from "../../api/wishlistApi.jsx"

const WishlistProductCard = ({ product, onRemove, onAddToBag }) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const navigate = useNavigate()

  const removeItem = async () => {
    try {
      setIsRemoving(true)
      await removeWishlistItem(product._id)
      onRemove?.(product._id)
    } catch (error) {
      console.error("Failed to remove wishlist item:", error)
    } finally {
      setIsRemoving(false)
    }
  }

  const image = product.images?.[0]?.url || product.images?.[0] || product.image
  const price = product.price?.amount ?? product.price

  return (
    <div className="flex flex-col min-w-0">
      <div className="relative">
        <div
          onClick={() => navigate(`/product/${product._id}`)}
          className="relative h-[260px] w-full cursor-pointer overflow-hidden md:h-[440px]"
        >
          <img
            src={image}
            alt={product.title || product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <button
          type="button"
          aria-label="Remove from wishlist"
          disabled={isRemoving}
          onClick={removeItem}
          className="absolute right-0 top-0 inline-flex cursor-pointer items-center justify-center p-2 disabled:opacity-50"
        >
          <Heart size={20} fill="#E54B29" color="#E54B29" strokeWidth={1.5} />
        </button>

        <div className="px-2 pb-2">
          <h2 className="mt-1 truncate text-[14px] leading-normal text-black">
            {product.title || product.name}
          </h2>
          <div className="mt-1">
            <span className="text-[12px] font-bold leading-normal text-black md:text-[14px]">
              ₹{Number(price || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <div className="px-2 pb-6">
        <button
          type="button"
          onClick={() => onAddToBag?.(product)}
          className="flex h-9 w-full items-center justify-center border border-black text-black"
        >
          <span className="text-[12px] uppercase leading-[17px]">
            Add to bag
          </span>
        </button>
      </div>
    </div>
  )
}

export default WishlistProductCard
