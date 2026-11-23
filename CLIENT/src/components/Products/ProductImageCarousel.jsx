import { useEffect, useState } from "react"

const ProductImageCarousel = ({ images = [], title, className = "", imageClassName = "object-cover", onClick }) => {
    const [currentImage, setCurrentImage] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [transition, setTransition] = useState(true)
    const imageUrls = images.map((image) => typeof image === "string" ? image : image?.url).filter(Boolean)
    const slides = imageUrls.length > 1 ? [...imageUrls, imageUrls[0]] : imageUrls

    useEffect(() => {
        if (!isHovered || imageUrls.length <= 1) return undefined
        const timer = setInterval(() => setCurrentImage((current) => current + 1), 1000)
        return () => clearInterval(timer)
    }, [isHovered, imageUrls.length])

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
