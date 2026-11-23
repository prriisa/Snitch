import { useEffect, useState } from "react"
import { Heart, Plus } from "lucide-react"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { addToCart } from "../../api/cartApi"
import { checkWishlistItem, addWishlistItem, removeWishlistItem } from "../../api/wishlistApi.jsx"
import { setToast } from "../../redux/Slice/toastSlice"
import ProductImageCarousel from "./ProductImageCarousel"

export default function ProductCard({ product }) {
  const { _id, title, price, images = [], sizes = [] } = product
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isChoosingSize, setIsChoosingSize] = useState(false)
  const [addingSize, setAddingSize] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const availableSizes = sizes.filter((item) => item.stock > 0)

  useEffect(() => {
    checkWishlistItem(_id).then(({ data }) => setIsWishlisted(data.exists === true)).catch(() => {})
  }, [_id])

  const toggleWishlist = async (e) => {
    e.stopPropagation()
    if (isUpdating) return
    setIsUpdating(true)
    try {
      if (isWishlisted) await removeWishlistItem(_id)
      else await addWishlistItem(_id)
      setIsWishlisted((prev) => !prev)
    } catch (error) {
      alert(error.response?.data?.message || "Please login to use your wishlist")
    } finally {
      setIsUpdating(false)
    }
  }

  const addProductToCart = async (size) => {
    if (addingSize) return
    setAddingSize(size)
    try {
      await addToCart(_id, size)
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
    <div className="relative w-full">
      <ProductImageCarousel images={images} title={title} className="aspect-[220/296]" onClick={() => navigate(`/product/${_id}`)} />

      <button type="button" aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} onClick={toggleWishlist} disabled={isUpdating} className="absolute right-0 top-0 p-2 disabled:opacity-50">
        <Heart size={20} strokeWidth={1.25} fill={isWishlisted ? "#E54B29" : "none"} color={isWishlisted ? "#E54B29" : "currentColor"} />
      </button>

      <div className="px-2 pb-2">
        <h2 className="mt-1 truncate text-[14px] font-light text-black">{title}</h2>
        <div className="flex w-full items-center justify-between">
          <span className="mt-1 text-[12px] font-bold text-black md:text-[14px]">{price?.currency === "INR" ? "₹" : `${price?.currency || ""} `}{Number(price?.amount || 0).toLocaleString("en-IN")}</span>
          <button type="button" aria-label="Add to bag" onClick={() => setIsChoosingSize((current) => !current)} className="inline-flex items-center justify-center pb-2 pt-1"><Plus size={20} strokeWidth={2.5} /></button>
        </div>
        {isChoosingSize && (
          <div className="mt-2 border-t border-neutral-200 pt-2">
            {availableSizes.length ? (
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(({ size }) => (
                  <button key={size} type="button" disabled={Boolean(addingSize)} onClick={() => addProductToCart(size)} className="min-w-9 border border-neutral-300 px-2 py-1 text-[11px] uppercase hover:border-black disabled:opacity-50">
                    {addingSize === size ? "..." : size}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[11px] uppercase tracking-wide text-neutral-500">Out of stock</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}