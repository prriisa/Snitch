import { useEffect, useRef, useState } from "react"

const mobileCarouselStates = new Map()
let mobileCarouselFrame = null
let mobileCarouselListenersAttached = false

const updateActiveMobileCarousel = () => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    let activeElement = null

    if (isMobile) {
        const viewportCenter = window.innerHeight / 2
        let closestDistance = Infinity

        for (const element of mobileCarouselStates.keys()) {
            const rect = element.getBoundingClientRect()
            const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0))
            const visibleRatio = rect.height ? visibleHeight / rect.height : 0
            if (visibleRatio < 0.65) continue

            const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter)
            if (distance < closestDistance) {
                closestDistance = distance
                activeElement = element
            }
        }
    }

    mobileCarouselStates.forEach((setIsActive, element) => {
        setIsActive(element === activeElement)
    })
}

const scheduleMobileCarouselUpdate = () => {
    if (mobileCarouselFrame !== null) return
    mobileCarouselFrame = window.requestAnimationFrame(() => {
        mobileCarouselFrame = null
        updateActiveMobileCarousel()
    })
}

const ProductImageCarousel = ({ images = [], title, className = "", imageClassName = "object-cover", onClick }) => {
    const carouselRef = useRef(null)
    const [currentImage, setCurrentImage] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isMobileVisible, setIsMobileVisible] = useState(false)
    const [transition, setTransition] = useState(true)
    const imageUrls = images.map((image) => typeof image === "string" ? image : image?.url).filter(Boolean)
    const slides = imageUrls.length > 1 ? [...imageUrls, imageUrls[0]] : imageUrls

    useEffect(() => {
        const element = carouselRef.current
        if (!element || imageUrls.length <= 1) return undefined

        mobileCarouselStates.set(element, setIsMobileVisible)
        if (!mobileCarouselListenersAttached) {
            window.addEventListener("scroll", scheduleMobileCarouselUpdate, { passive: true })
            window.addEventListener("resize", scheduleMobileCarouselUpdate)
            mobileCarouselListenersAttached = true
        }

        updateActiveMobileCarousel()
        return () => {
            mobileCarouselStates.delete(element)
            updateActiveMobileCarousel()

            if (!mobileCarouselStates.size) {
                window.removeEventListener("scroll", scheduleMobileCarouselUpdate)
                window.removeEventListener("resize", scheduleMobileCarouselUpdate)
                mobileCarouselListenersAttached = false
                if (mobileCarouselFrame !== null) {
                    window.cancelAnimationFrame(mobileCarouselFrame)
                    mobileCarouselFrame = null
                }
            }
        }
    }, [imageUrls.length])

    useEffect(() => {
        if ((!isHovered && !isMobileVisible) || imageUrls.length <= 1) return undefined
        const timer = setInterval(() => setCurrentImage((current) => current + 1), 1000)
        return () => clearInterval(timer)
    }, [isHovered, isMobileVisible, imageUrls.length])

    const handleMouseLeave = () => {
        setIsHovered(false)
        setTransition(false)
        setCurrentImage(0)
        requestAnimationFrame(() => requestAnimationFrame(() => setTransition(true)))
    }

    const handleTransitionEnd = (event) => {
        if (event.target !== event.currentTarget || currentImage !== imageUrls.length) return
        setTransition(false)
        setCurrentImage(0)
        requestAnimationFrame(() => requestAnimationFrame(() => setTransition(true)))
    }

    return (
        <div
            ref={carouselRef}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full cursor-pointer overflow-hidden bg-[#f3f3f3] ${className}`}
        >
            {slides.length ? (
                <div
                    onTransitionEnd={handleTransitionEnd}
                    className={`flex h-full w-full ${transition ? "transition-transform duration-500 ease-in-out" : ""}`}
                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                    {slides.map((image, index) => (
                        <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={title || "Product"}
                            loading="lazy"
                            className={`h-full w-full shrink-0 ${imageClassName}`}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-neutral-400">No image</div>
            )}
        </div>
    )
}

export default ProductImageCarousel
