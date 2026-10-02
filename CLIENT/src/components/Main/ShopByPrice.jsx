import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
    {
        id: 1,
        title: "BUY 3 TOPWEAR",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-price/e8ed8e35-4c54-4713-827a-756f77d2e123/1790573544.jpeg?w=90",
    },
    {
        id: 2,
        title: "BUY 2 BOTTOM WEAR",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-price/66f44d39-c9ed-4892-8188-28960c14852b/1790573692.jpeg?w=90",
    },
    {
        id: 3,
        title: "SHIRTS UNDER 999",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-price/a51c53ef-4b07-4dd4-8df4-ae1b547df51e/1790573606.jpeg?w=90",
    },
    {
        id: 4,
        title: "SUNGLASSES",
        image:
            "https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-price/63abd977-30f5-44e3-8a08-9e9cfb066352/1790573566.jpeg?w=90",
    },
];

const ShopByPrice = () => {
    const mobileContainerRef = useRef(null);
    const desktopContainerRef = useRef(null);

    const [mobileIndex, setMobileIndex] = useState(4);
    const [desktopIndex, setDesktopIndex] = useState(4);

    const [mobileTransition, setMobileTransition] = useState(true);
    const [desktopTransition, setDesktopTransition] = useState(true);

    const [mobileContainerWidth, setMobileContainerWidth] = useState(0);
    const [desktopContainerWidth, setDesktopContainerWidth] = useState(0);

    const [mobileAnimating, setMobileAnimating] = useState(false);
    const [desktopAnimating, setDesktopAnimating] = useState(false);

    /*
      1 2 3 4 | 1 2 3 4 | 1 2 3 4
  
      We start at the middle copy:
  
      index 4 = 1
      index 5 = 2
      index 6 = 3
      index 7 = 4
      index 8 = 1
  
      So 4 → 1 is physically the next card.
    */

    const slides = [...offers, ...offers, ...offers];

    const CARD_WIDTH = 289;
    const GAP = 8;
    const CARD_STEP = CARD_WIDTH + GAP;

    /* -----------------------------------------
       CONTAINER WIDTH
    ----------------------------------------- */

    useEffect(() => {
        const updateWidth = () => {
            if (mobileContainerRef.current) {
                setMobileContainerWidth(
                    mobileContainerRef.current.offsetWidth
                );
            }

            if (desktopContainerRef.current) {
                setDesktopContainerWidth(
                    desktopContainerRef.current.offsetWidth
                );
            }
        };

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    /* -----------------------------------------
       MOBILE
    ----------------------------------------- */

    const nextMobile = () => {
        if (mobileAnimating) return;

        setMobileAnimating(true);
        setMobileTransition(true);
        setMobileIndex((prev) => prev + 1);
    };

    const previousMobile = () => {
        if (mobileAnimating) return;

        setMobileAnimating(true);
        setMobileTransition(true);
        setMobileIndex((prev) => prev - 1);
    };

    const handleMobileTransitionEnd = () => {
        /*
          4 → 1 complete hone ke baad:
    
          visible:
          duplicate 1
    
          instantly move to:
          original 1
    
          Both images are identical,
          so user sees NO jump.
        */

        if (mobileIndex === 8) {
            setMobileTransition(false);
            setMobileIndex(4);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setMobileTransition(true);
                    setMobileAnimating(false);
                });
            });

            return;
        }

        /*
          1 ← 4 backward loop
        */

        if (mobileIndex === 3) {
            setMobileTransition(false);
            setMobileIndex(7);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setMobileTransition(true);
                    setMobileAnimating(false);
                });
            });

            return;
        }

        setMobileAnimating(false);
    };

    /*
      Mobile original position:
  
      16px from left
    */

    const mobileTranslate =
        16 - mobileIndex * CARD_STEP;

    /* -----------------------------------------
       DESKTOP
    ----------------------------------------- */

    const nextDesktop = () => {
        if (desktopAnimating) return;

        setDesktopAnimating(true);
        setDesktopTransition(true);
        setDesktopIndex((prev) => prev + 1);
    };

    const previousDesktop = () => {
        if (desktopAnimating) return;

        setDesktopAnimating(true);
        setDesktopTransition(true);
        setDesktopIndex((prev) => prev - 1);
    };

    const handleDesktopTransitionEnd = () => {
        /*
          4 → 1
    
          index 7 = 4
          index 8 = 1
    
          After animation silently reset
          to original index 4.
        */

        if (desktopIndex === 8) {
            setDesktopTransition(false);
            setDesktopIndex(4);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setDesktopTransition(true);
                    setDesktopAnimating(false);
                });
            });

            return;
        }

        /*
          Backward:
    
          1 ← 4
        */

        if (desktopIndex === 3) {
            setDesktopTransition(false);
            setDesktopIndex(7);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setDesktopTransition(true);
                    setDesktopAnimating(false);
                });
            });

            return;
        }

        setDesktopAnimating(false);
    };

    /*
      Desktop:
  
      4 cards
      289 × 4 = 1156
      3 gaps × 8 = 24
  
      Total = 1180px
  
      Center it automatically according
      to actual screen width.
    */

    const desktopStart =
        Math.max(0, (desktopContainerWidth - 1180) / 2);

    const desktopTranslate =
        desktopStart - desktopIndex * CARD_STEP;

    return (
        <section className="my-7 md:my-8">

            {/* =========================================
          MOBILE
      ========================================= */}

            <div className="relative block aspect-[369/542] w-full overflow-hidden bg-[#F3F3F3] md:hidden">

                {/* MAIN IMAGE */}

                <div className="absolute inset-0 h-full w-full">
                    <img
                        src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-price-card/af54df31-1028-4b4d-bb4e-0cb7e3883ad1/1787732676_mobile.jpeg"
                        alt="SALE"
                        className="block h-full w-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />
                </div>

                {/* CARDS VIEWPORT */}

                <div
                    ref={mobileContainerRef}
                    className="absolute bottom-[34px] left-0 right-0 z-20 overflow-hidden"
                >
                    <div
                        onTransitionEnd={handleMobileTransitionEnd}
                        className={`flex gap-2 pl-0 ${mobileTransition
                                ? "transition-transform duration-500 ease-out"
                                : ""
                            }`}
                        style={{
                            transform: `translateX(${mobileTranslate}px)`,
                        }}
                    >
                        {slides.map((offer, index) => (
                            <button
                                key={`${offer.id}-${index}`}
                                type="button"
                                className="relative h-[110px] w-[289px] shrink-0 overflow-hidden rounded-[2px]"
                            >
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="block h-full w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* MOBILE LEFT ARROW */}

                <button
                    type="button"
                    aria-label="Previous offer"
                    onClick={previousMobile}
                    disabled={mobileAnimating}
                    className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform active:scale-95 disabled:pointer-events-none"
                >
                    <ChevronLeft
                        size={20}
                        strokeWidth={1.5}
                        className="text-black"
                    />
                </button>

                {/* MOBILE RIGHT ARROW */}

                <button
                    type="button"
                    aria-label="Next offer"
                    onClick={nextMobile}
                    disabled={mobileAnimating}
                    className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform active:scale-95 disabled:pointer-events-none"
                >
                    <ChevronRight
                        size={20}
                        strokeWidth={1.5}
                        className="text-black"
                    />
                </button>
            </div>


            {/* =========================================
          DESKTOP
      ========================================= */}

            <div
                ref={desktopContainerRef}
                className="relative hidden aspect-[1440/630] w-full overflow-hidden bg-[#F3F3F3] md:block"
            >

                {/* MAIN IMAGE */}

                <div className="absolute inset-0 h-full w-full">

                    <img
                        src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-price-card/af54df31-1028-4b4d-bb4e-0cb7e3883ad1/1787732676_desktop.jpeg"
                        alt="SALE"
                        className="block h-full w-full object-contain"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                    />

                </div>

                {/* DARK/EMPTY BACKGROUND ONLY AROUND IMAGE */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[#F3F3F3]" />

                {/* CARDS */}

                <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden pb-10 pt-10">

                    <div
                        onTransitionEnd={handleDesktopTransitionEnd}
                        className={`flex gap-2 ${desktopTransition
                                ? "transition-transform duration-500 ease-out"
                                : ""
                            }`}
                        style={{
                            transform: `translateX(${desktopTranslate}px)`,
                        }}
                    >
                        {slides.map((offer, index) => (
                            <button
                                key={`${offer.id}-${index}`}
                                type="button"
                                className="group relative h-[110px] w-[289px] shrink-0 overflow-hidden rounded-[2px]"
                            >
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="block h-full w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className="absolute inset-0 bg-[#F3F3F3] opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                            </button>
                        ))}
                    </div>

                </div>

                {/* DESKTOP LEFT ARROW */}

                <button
                    type="button"
                    aria-label="Previous offer"
                    onClick={previousDesktop}
                    disabled={desktopAnimating}
                    className="absolute left-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform active:scale-95 disabled:pointer-events-none"
                >
                    <ChevronLeft
                        size={20}
                        strokeWidth={1.5}
                        className="text-black"
                    />
                </button>

                {/* DESKTOP RIGHT ARROW */}

                <button
                    type="button"
                    aria-label="Next offer"
                    onClick={nextDesktop}
                    disabled={desktopAnimating}
                    className="absolute right-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-transform active:scale-95 disabled:pointer-events-none"
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

export default ShopByPrice;