
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Plus } from "lucide-react"
import { addToCart } from "../../api/cartApi.jsx"
import { fetchCart, fetchCartTotal } from "../../api/cartApi.jsx"
import { setCart, setTotalPrice, setCartError } from "../../redux/Slice/cartSlice.jsx"

export default function AddButton({ productId, size }) {
  const dispatch = useDispatch()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!productId || !size) {
      dispatch(setCartError("Please select a size first"))
      return
    }

    try {
      setIsAdding(true)
      dispatch(setCartError(null))

      await addToCart(productId, size, 1)

      const [{ data: cartData }, { data: totalData }] = await Promise.all([
        fetchCart(),
        fetchCartTotal()
      ])

      dispatch(setCart(cartData?.data?.products || cartData?.products || []))
      dispatch(setTotalPrice(totalData?.data?.total ?? totalData?.total ?? totalData?.grandTotal ?? 0))
    } catch (error) {
      dispatch(setCartError(error.response?.data?.message || "Failed to add product to cart"))
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="flex w-full gap-3">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding}
        className="flex flex-1 items-center justify-center gap-2 border border-black bg-white py-3 text-sm uppercase text-black disabled:opacity-50"
      >
        {isAdding ? "Adding..." : "Add to Cart"} <Plus size={14} />
      </button>

      <button
        type="button"
        className="flex flex-1 items-center justify-center bg-black py-3 text-sm uppercase text-white"
      >
        Buy Now
      </button>
    </div>
  )
}