import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { Minus, Plus } from "lucide-react"
import { fetchSingleProduct } from "../api/productApi.jsx"
import { setSingleProduct, clearSingleProduct, setProductLoading, setProductError } from "../redux/Slice/singleProductSlice.jsx"
import Accordion from "../components/SingleProduct/Accordion.jsx"
import AddButton from "../components/SingleProduct/AddButton.jsx"
import ProductHeader from "../components/SingleProduct/ProductHeader.jsx"
import ProductGallery from "../components/SingleProduct/ProductsGallery.jsx"
import ProductDescription from "../components/SingleProduct/ProductDescription.jsx"
import SizeSelector from "../components/SingleProduct/SizeSelector.jsx"

export default function SingleProductPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { product, loading, error, selectedSize } = useSelector((state) => state.singleProduct)
  const [interaction, setInteraction] = useState({ productId: id, quantity: 1, pincode: "", deliveryMessage: "" })
  const productInteraction = interaction.productId === id
    ? interaction
    : { productId: id, quantity: 1, pincode: "", deliveryMessage: "" }
  const quantity = productInteraction.quantity
  const pincode = productInteraction.pincode
  const deliveryMessage = productInteraction.deliveryMessage

  const selectedSizeStock = product?.sizes?.find((item) => item.size === selectedSize)?.stock || 0
  const maxQuantity = selectedSize ? Math.min(10, selectedSizeStock) : 1
  const displayedQuantity = Math.max(1, Math.min(quantity, maxQuantity || 1))

  const updateInteraction = (field, value) => {
    setInteraction((current) => {
      const currentInteraction = current.productId === id
        ? current
        : { productId: id, quantity: 1, pincode: "", deliveryMessage: "" }
      return {
        ...currentInteraction,
        [field]: typeof value === "function" ? value(currentInteraction[field]) : value
      }
    })
  }

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        dispatch(clearSingleProduct())
        dispatch(setProductError("Product ID is missing."))
        return
      }

      dispatch(clearSingleProduct())
      dispatch(setProductLoading())

      try {
        const response = await fetchSingleProduct(id)
        const data = response.data?.data?.product

        if (!data) return dispatch(setProductError("Product not found."))
        dispatch(setSingleProduct(data))
      
      } catch (error) {
        console.error("Product fetch error:", error)
        dispatch(setProductError(error.response?.data?.message || "Unable to load product. Please try again."))
      }
    }

    fetchProduct()
  }, [id, dispatch])

  if (loading) return <p className="mt-24 text-center">Loading product...</p>
  if (error || !product) return <p className="mt-24 text-center text-sm text-red-500">{error || "Product not found."}</p>

  return (
    <main className="flex flex-col items-center justify-center gap-6 bg-white pt-25 md:flex-row md:items-start md:gap-8 md:pb-10">
      <ProductGallery />

      <div className="w-full md:sticky md:top-[100px] md:w-[45%] md:self-start md:px-5 lg:w-[40%]">
        <ProductHeader />
        <SizeSelector />

        <div className="mx-4 my-4 md:mx-0">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest">Quantity</span>
            <div className="inline-flex items-center border border-neutral-300">
              <button type="button" aria-label="Decrease quantity" disabled={displayedQuantity <= 1} onClick={() => updateInteraction("quantity", (current) => Math.max(1, current - 1))} className="p-2.5 disabled:opacity-40">
                <Minus size={14} />
              </button>
              <span aria-live="polite" className="min-w-9 text-center text-sm">{displayedQuantity}</span>
              <button type="button" aria-label="Increase quantity" disabled={!selectedSize || displayedQuantity >= maxQuantity} onClick={() => updateInteraction("quantity", (current) => Math.min(10, selectedSizeStock, current + 1))} className="p-2.5 disabled:opacity-40">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden pb-2 md:block">
          <AddButton productId={product._id} size={selectedSize} quantity={displayedQuantity} />
        </div>

        <div className="my-4 border-t">
          <Accordion title="Delivery" open>
            <div className="flex justify-between border border-[#b8b8b8] px-5 py-1.5">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                value={pincode}
                onChange={(event) => {
                  updateInteraction("pincode", event.target.value.replace(/\D/g, "").slice(0, 6))
                  updateInteraction("deliveryMessage", "")
                }}
                aria-label="Delivery PIN code"
                placeholder="Enter PIN code"
                className="flex-1 bg-transparent text-xs outline-none"
              />
              <button type="button" onClick={() => updateInteraction("deliveryMessage", /^[1-9]\d{5}$/.test(pincode) ? "PIN code format accepted. Estimated delivery: 5-7 working days." : "Enter a valid 6-digit PIN code.")} className="font-bold text-[#e54b29]">CHECK</button>
            </div>
            <p role="status" className={`mt-3 px-4 py-2 text-xs ${deliveryMessage ? deliveryMessage.startsWith("Enter") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800" : "bg-[#F5A593] text-[#333]"}`}>
              {deliveryMessage || "Enter your PIN code for an estimated delivery window."}
            </p>
          </Accordion>

          <Accordion title="Description & Fit">
            <ProductDescription />
          </Accordion>

          <Accordion title="Reviews">
            <p className="text-xs font-light">No reviews for this style yet.</p>
          </Accordion>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[480px] p-4 md:hidden">
        <AddButton productId={product._id} size={selectedSize} quantity={displayedQuantity} />
      </div>
    </main>
  )
}