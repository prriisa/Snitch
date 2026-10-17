import { useEffect, useState } from "react";
import { Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export default function ProductCard({ product }) {
  const { title, price, images = [] } = product;
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [transition, setTransition] = useState(true);
  const navigate = useNavigate()

  const imageUrls = images
    .map((image) => typeof image === "string" ? image : image?.url)
    .filter(Boolean);

  const slides = [...imageUrls, ...imageUrls.slice(0, 1)];

  useEffect(() => {
    if (!isHovered || imageUrls.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isHovered, imageUrls.length]);

  useEffect(() => {
    if (currentImage === imageUrls.length && imageUrls.length > 1) {
      const timer = setTimeout(() => {
        setTransition(false);
        setCurrentImage(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransition(true));
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentImage, imageUrls.length]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransition(false);
    setCurrentImage(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransition(true));
    });
  };

  return (
    <div className="relative w-full">
      <div onClick = {()=>{navigate(`/product/${product._id}`)}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden aspect-[220/296] bg-[#f3f3f3]"
      >
        {imageUrls.length > 0 && (
          <div
            className={`flex h-full w-full ${
              transition
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {slides.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={title}
                loading="lazy"
                className="h-full w-full shrink-0 object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-label="Add to wishlist"
        className="absolute top-0 right-0 p-2"
      >
        <Heart size={20} strokeWidth={1.25} />
      </button>

      <div className="px-2 pb-2">
        <h2 className="mt-1 truncate text-[14px] font-light text-black">
          {title}
        </h2>

        <div className="flex items-center justify-between w-full">
          <span className="mt-1 text-[12px] md:text-[14px] font-bold text-black">
            {price?.currency === "INR" ? "₹" : price?.currency}
            {price?.amount}
          </span>

          <button
            type="button"
            aria-label="Add to bag"
            className="inline-flex items-center justify-center pb-2 pt-1"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}