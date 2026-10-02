import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const occasions = [
  {
    id: 1,
    title: "Printed Shirts",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/c40ee88e-3ca1-4a9c-a8af-9f392a61c2e5/1789665206_desktop.jpeg?w=90",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/c40ee88e-3ca1-4a9c-a8af-9f392a61c2e5/1789665206_mobile.jpeg?w=90",
  },
  {
    id: 2,
    title: "Checked Shirts",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/2ce81ca6-8be8-4294-b404-524905d9577a/1789665454_desktop.jpeg?w=90",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/2ce81ca6-8be8-4294-b404-524905d9577a/1789665454_mobile.jpeg?w=90",
  },
  {
    id: 3,
    title: "Formal Shirts",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/d3fa414f-7299-49bc-9380-eb8832c72b75/1789665318_desktop.jpeg?w=90",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/d3fa414f-7299-49bc-9380-eb8832c72b75/1789665318_mobile.jpeg?w=90",
  },
  {
    id: 4,
    title: "Hand Embroidered",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/dba7e4f4-331f-4a17-88b2-27555e544c73/1790312601_desktop.jpeg?w=90",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/dba7e4f4-331f-4a17-88b2-27555e544c73/1790312601_mobile.jpeg?w=90",
  },
  {
    id: 5,
    title: "Jacquard Shirts",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/891345a5-4f4b-45fa-aa03-6836fe81405d/1790154059_desktop.jpeg?w=90",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/891345a5-4f4b-45fa-aa03-6836fe81405d/1790154059_mobile.jpeg?w=90",
  },
  {
    id: 6,
    title: "Striped Shirts",
    desktop:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/9284eb18-69dc-4c13-b351-e1c00a4d378c/1789665148_desktop.jpeg?w=90",
    mobile:
      "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/9284eb18-69dc-4c13-b351-e1c00a4d378c/1789665148_mobile.jpeg?w=90",
  },
];

const ShopByOccasion = () => {
  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(6);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [transition, setTransition] = useState(true);

  const slides = [...occasions, ...occasions, ...occasions];

  // Calculate exact slide width
  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      const isMobile = window.innerWidth < 768;

      setVisibleSlides(isMobile ? 1 : 3);
      setSlideWidth(isMobile ? width : width / 3);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const nextSlide = () => {
    setTransition(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const previousSlide = () => {
    setTransition(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    // Forward loop
    if (currentIndex >= occasions.length * 2) {
      setTransition(false);
      setCurrentIndex(occasions.length);
    }

    // Backward loop
    if (currentIndex < occasions.length) {
      setTransition(false);
      setCurrentIndex(occasions.length * 2 - 1);
    }
  };

  return (
    <section className="my-7 md:my-8">
      <div
        ref={containerRef}
        className="relative w-full aspect-[369/542] md:aspect-[1440/630] overflow-hidden"
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex h-full ${
            transition ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
          }}
        >
          {slides.map((occasion, index) => (
            <div
              key={`${occasion.id}-${index}`}
              className="relative h-full shrink-0 overflow-hidden"
              style={{
                width: slideWidth,
              }}
            >
              <picture className="absolute inset-0 block h-full w-full">
                <source
                  media="(min-width: 768px)"
                  srcSet={occasion.desktop}
                />

                <img
                  src={occasion.mobile}
                  alt={occasion.title}
                  className="block h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={previousSlide}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm md:left-2 md:h-8 md:w-8"
        >
          <ChevronLeft
            size={20}
            strokeWidth={1.5}
            className="text-black"
          />
        </button>

        {/* RIGHT ARROW */}
        <button
          type="button"
          aria-label="Next slide"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm md:right-2 md:h-8 md:w-8"
        >
          <ChevronRight
            size={20}
            strokeWidth={1.5}
            className="text-black"
          />
        </button>
      </div>
    </section>
  );
};

export default ShopByOccasion;