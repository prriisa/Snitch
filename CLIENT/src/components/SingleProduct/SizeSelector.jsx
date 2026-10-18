import { Ruler } from "lucide-react"
import { useSelector } from "react-redux"

export default function SizeSelector() {
  const sizes = useSelector((state) => state.singleProduct.product?.sizes || [])

  return (
    <div className="mx-4 my-3 md:mx-0">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-light">
          <Ruler size={18} className="text-[#E16E50]" />
          Select your size
        </span>
      </div>

      <div className="flex">
        {sizes.map((s, i) => {
          const size = typeof s === "string" ? s : s.size

          return (
            <button key={size || i} disabled={typeof s === "object" && s.stock === 0}
              className="h-11 min-w-12 border border-neutral-300 px-3 text-sm -ml-px first:ml-0 hover:bg-gray-50">
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}