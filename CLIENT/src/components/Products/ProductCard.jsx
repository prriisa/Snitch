import { Heart, Plus } from "lucide-react";

export default function ProductCard({ product }) {
  const { title, price, image, colors = [], moreColors = 0 } = product;

  return (
    <div className="relative w-full">
      <div className="block">
        <div className="relative w-full overflow-hidden aspect-[220/296] bg-[#f3f3f3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute top-0 right-0 p-2 inline-flex items-center justify-center"
      >
        <Heart
          size={20}
          strokeWidth={1.25}
        />
      </button>

      <div className="px-2 pb-2">
        <h2 className="mt-1 truncate text-[14px] font-light text-black">
          {title}
        </h2>

        <div className="flex items-start justify-between w-full">
          <div className="mt-1">
            <span className="text-[12px] md:text-[14px] md:leading-[22px] font-bold text-black">
              ₹{price}
            </span>

            {colors.length > 0 && (
              <div className="flex items-center my-2">
                {colors.map((c) => (
                  <div
                    key={c}
                    className="w-2 h-2 mr-1 mb-[2px]"
                    style={{ backgroundColor: c }}
                  />
                ))}

                {moreColors > 0 && (
                  <span className="ml-1 mb-[2px] text-[10px] leading-[14px] font-light text-black">
                    +{moreColors}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Add to bag"
            className="inline-flex items-center justify-center pb-4 pt-1"
          >
            <Plus
              size={20}
              strokeWidth={2.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}