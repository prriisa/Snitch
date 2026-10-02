import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    desktop: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/eec77386-06de-49a9-bd68-b1645010eaa9/1788933123_desktop.jpeg",
    mobile: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/eec77386-06de-49a9-bd68-b1645010eaa9/1788933123_mobile.jpeg?w=90",
    alt: "Image of PERFUMES",
  },
  {
    desktop: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/2ebadab1-812a-4344-8e90-05322196e512/1790234569_desktop.jpeg",
    mobile: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/2ebadab1-812a-4344-8e90-05322196e512/1790234569_mobile.jpeg?w=90",
    alt: "Image of Snitch Technical",
  },
  {
    desktop: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/211b4486-292c-4bb0-8f01-265af488e2cc/1789991986_desktop.jpeg",
    mobile: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/211b4486-292c-4bb0-8f01-265af488e2cc/1789991986_mobile.jpeg?w=90",
    alt: "Image of LUXE LINEN",
  },
  {
    desktop: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/20d1bc54-5e52-411c-b3af-0b4fbef3aeeb/1789450936_desktop.jpeg",
    mobile: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/20d1bc54-5e52-411c-b3af-0b4fbef3aeeb/1789450936_mobile.jpeg?w=90",
    alt: "Image of OUTERWEAR",
  },
  {
    desktop: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/be0e0add-c2e9-4da6-83ed-cde6f5a6e761/1790312698_desktop.jpeg",
    mobile: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/be0e0add-c2e9-4da6-83ed-cde6f5a6e761/1790312698_mobile.jpeg?w=90",
    alt: "Image of JACKETS",
  },
  {
    desktop: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/8cd974e5-7ca0-4125-a154-1ff0624fc434/1789666179_desktop.jpeg",
    mobile: "https://d2d5n4ft74bagm.cloudfront.net/media/banners/8cd974e5-7ca0-4125-a154-1ff0624fc434/1789666179_mobile.jpeg?w=90",
    alt: "Image of Statement Shirts",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);

  const slides = [...banners, banners[0]];

  const next = () => setCurrent((prev) => prev + 1);

  const prev = () => {
    if (current === 0) {
      setTransition(false);
      setCurrent(banners.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransition(true));
      });
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (current === banners.length) {
      const timer = setTimeout(() => {
        setTransition(false);
        setCurrent(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransition(true));
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [current]);

  return (
    <section className="relative mt-[58px] aspect-[393/647] w-full overflow-hidden md:mt-[86px] md:aspect-[1440/680]">
      <div
        className={`flex h-full ${transition ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((banner, index) => (
          <picture key={index} className="block h-full w-full shrink-0">
            <source media="(min-width: 768px)" srcSet={banner.desktop} />
            <img src={banner.mobile} alt={banner.alt} className="h-full w-full object-cover" />
          </picture>
        ))}
      </div>

      <button
        onClick={prev}
        aria-label="Previous banner"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-1.5"
      >
        <ChevronLeft size={20} strokeWidth={1.25} />
      </button>

      <button
        onClick={next}
        aria-label="Next banner"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-1.5"
      >
        <ChevronRight size={20} strokeWidth={1.25} />
      </button>
    </section>
  );
};

export default HeroBanner;