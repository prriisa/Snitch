
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { useSelector } from "react-redux"

const wide = (i) => [0, 3, 4].includes(i % 7)

export default function ProductGallery() {
  const p = useSelector((state) => state.singleProduct.product)
  const images = p?.images || []

  const arrow = "absolute top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/70"

  const imageUrls = images
    .map((image) => typeof image === "string" ? image : image?.url)
    .filter(Boolean)

  return (
    <div className="relative w-full md:w-[45%] md:shrink-0">
      {/* mobile slider */}
      <div className="relative md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]">
          {imageUrls.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={p?.title || "Product image"}
              className="w-full shrink-0 snap-center aspect-[3/4] object-cover"
            />
          ))}
        </div>

        <button className={`${arrow} left-2`}>
          <ChevronLeft size={16} />
        </button>

        <button className={`${arrow} right-2`}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* desktop grid */}
      <div className="hidden md:grid grid-cols-2">
        {imageUrls.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={p?.title || "Product image"}
            className={`w-full object-cover ${wide(i) ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"}`}
          />
        ))}
      </div>

      <button className="hidden md:block absolute top-4 right-4 p-4">
        <Heart size={24} strokeWidth={1.25} />
      </button>
    </div>
  )
}
