import { Plus } from "lucide-react"

export default function AddButton() {
  return (
    <div className="flex w-full gap-3">
      <button className="flex flex-1 items-center justify-center gap-2 border border-black bg-white py-3 text-sm uppercase text-black">
        Add to Cart <Plus size={14} />
      </button>

      <button className="flex flex-1 items-center justify-center bg-black py-3 text-sm uppercase text-white">
        Buy Now
      </button>
    </div>
  )
}