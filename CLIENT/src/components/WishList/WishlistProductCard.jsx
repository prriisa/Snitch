
import { useState } from "react"
import { Heart } from "lucide-react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { addToCart } from "../../api/cartApi"
import { removeWishlistItem } from "../../api/wishlistApi.jsx"
import ProductImageCarousel from "../Products/ProductImageCarousel"
import { setToast } from "../../redux/Slice/toastSlice"

const WishlistProductCard = ({ product, onRemove, onAddToBag }) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const [isChoosingSize, setIsChoosingSize] = useState(false)
  const [addingSize, setAddingSize] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const availableSizes = (product.sizes || []).filter((item) => item.stock > 0)

  const removeItem = async () => {
    try {
      setIsRemoving(true)
      await removeWishlistItem(product._id)
      onRemove?.(product._id)
    } catch (error) {
      dispatch(setToast({
        success: false,
        message: error.response?.data?.message || "Could not remove this product from your wishlist."
      }))
    } finally {
      setIsRemoving(false)
    }
  }

  const addBagItem = async (size) => {
    if (addingSize) return
    try {
      setAddingSize(size)
      if (onAddToBag) await onAddToBag(product, size)
      else await addToCart(product._id, size)
      setIsChoosingSize(false)
      dispatch(setToast({ success: true, message: "Product added to your bag." }))
    } catch (error) {
      dispatch(setToast({
        success: false,
        message: error.response?.data?.message || "Could not add this product to your bag."
      }))
    } finally {
      setAddingSize("")
    }
  }

  return (
    <div className="flex flex-col min-w-0">
      <div className="relative">
        <ProductImageCarousel
          images={product.images || (product.image ? [product.image] : [])}
          title={product.title || product.name}
          className="aspect-[220/296]"
          onClick={() => navigate(`/product/${product._id}`)}
        />
        <button
          type="button"
          aria-label="Remove from wishlist"
          disabled={isRemoving}
          onClick={removeItem}
          className="absolute right-0 top-0 inline-flex items-center justify-center p-2 disabled:opacity-50"
        >
          <Heart size={20} fill="#E54B29" color="#E54B29" strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-2 pb-2">
        <button type="button" onClick={() => navigate(`/product/${product._id}`)} className="mt-1 h-5 w-full truncate text-left text-[14px] leading-5 text-black">
          {product.title || product.name}
        </button>
        <p className="mt-1 text-[12px] font-bold leading-normal text-black md:text-[14px]">
          {product.price?.currency === "INR" ? "₹" : `${product.price?.currency || ""} `}
          {Number(product.price?.amount ?? product.price ?? 0).toLocaleString("en-IN")}
        </p>
        <button
          type="button"
          onClick={() => setIsChoosingSize((current) => !current)}
          className="mt-3 flex h-9 w-full items-center justify-center border border-black text-black hover:bg-black hover:text-white"
        >
          <span className="text-[12px] uppercase leading-[17px]">Add to bag</span>
        </button>
        {isChoosingSize && (
          <div className="mt-2 flex flex-wrap gap-2">
            {availableSizes.length ? availableSizes.map(({ size }) => (
              <button key={size} type="button" disabled={Boolean(addingSize)} onClick={() => addBagItem(size)} className="min-w-9 border border-neutral-300 px-2 py-1 text-[11px] uppercase hover:border-black disabled:opacity-50">
                {addingSize === size ? "..." : size}
              </button>
            )) : <p className="text-[11px] uppercase tracking-wide text-neutral-500">Out of stock</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistProductCard
