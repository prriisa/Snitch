import { Ruler } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedSize } from "../../redux/Slice/singleProductSlice"

export default function SizeSelector() {
  const sizes = useSelector((state) => state.singleProduct.product?.sizes || [])
  const selectedSizeStock = useSelector((state) => state.singleProduct.product?.sizes?.find((item) => item.size === state.singleProduct.selectedSize)?.stock)
  const selectedSize = useSelector((state) => state.singleProduct.selectedSize)
  const dispatch = useDispatch()

  return (
    <div className="mx-4 my-3 md:mx-0">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-light">
          <Ruler size={18} className="text-[#E16E50]" />
          Select your size
        </span>
        {selectedSize && selectedSizeStock < 8 && (
          <span role="status" className="font-medium text-red-600">
            {selectedSizeStock > 0 ? `Only ${selectedSizeStock} left` : "Out of stock"}
          </span>
        )}
      </div>
      {!selectedSize && (
        <p className="mb-2 text-xs text-[#e54b29]" role="status">
          Select a size first to change the quantity.
        </p>
      )}

      <div className="flex">
        {sizes.map((s, i) => {
          const size = typeof s === "string" ? s : s.size

          return (
            <button
              key={size || i}
              type="button"
              disabled={typeof s === "object" && s.stock === 0}
              aria-pressed={selectedSize === size}
              onClick={() => dispatch(setSelectedSize(size))}
              className={`-ml-px h-11 min-w-12 border px-3 text-sm first:ml-0 disabled:cursor-not-allowed disabled:opacity-40 ${selectedSize === size ? "border-black bg-black text-white hover:bg-black hover:text-white" : "border-neutral-300 bg-white text-black hover:bg-gray-100 hover:text-black"}`}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}