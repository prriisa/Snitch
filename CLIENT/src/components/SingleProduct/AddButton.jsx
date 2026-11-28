
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router"
import { addToCart, fetchCart, fetchCartTotal } from "../../api/cartApi.jsx"
import { setCart, setTotalPrice, setCartError } from "../../redux/Slice/cartSlice.jsx"
import { setToast } from "../../redux/Slice/toastSlice"

export default function AddButton({ productId, size, quantity = 1 }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (goToCart = false) => {
    if (!productId || !size) {
      dispatch(setCartError("Please select a size first"))
      dispatch(setToast({ success: false, message: "Please select a size first." }))
      return
    }

    try {
      setIsAdding(true)
      dispatch(setCartError(null))

      await addToCart(productId, size, quantity)

      const [{ data: cartData }, { data: totalData }] = await Promise.all([
        fetchCart(),
        fetchCartTotal()
      ])

      dispatch(setCart(cartData?.data?.products || cartData?.products || []))
      dispatch(setTotalPrice(totalData?.data?.total ?? totalData?.total ?? totalData?.grandTotal ?? 0))
      dispatch(setToast({ success: true, message: "Product added to your bag." }))
      if (goToCart) navigate("/cart")
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add product to your bag."
      dispatch(setCartError(message))
      dispatch(setToast({ success: false, message }))
    } finally {
      setIsAdding(false)
    }
  }

  const handleBuyNow = () => {
    if (!productId || !size) {
      dispatch(setCartError("Please select a size first"))
      dispatch(setToast({ success: false, message: "Please select a size first." }))
      return
    }

    navigate("/checkout", { state: { buyNow: { productId, size, quantity } } })
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
        onClick={handleBuyNow}
        disabled={isAdding}
        className="flex flex-1 items-center justify-center bg-black py-3 text-sm uppercase text-white disabled:opacity-50"
      >
        {isAdding ? "Please wait..." : "Buy Now"}
      </button>
    </div>
  )
}