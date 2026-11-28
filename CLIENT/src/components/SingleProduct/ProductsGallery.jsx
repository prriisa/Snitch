import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { setToast } from "../../redux/Slice/toastSlice"
import {
  checkWishlistItem,
  addWishlistItem,
  removeWishlistItem
} from "../../api/wishlistApi.jsx"

const wide = (i) => [0, 3, 4].includes(i % 7)

export default function ProductGallery() {
  const p = useSelector((state) => state.singleProduct.product)
  const dispatch = useDispatch()

  const [wishlistState, setWishlistState] = useState({ productId: "", isWishlisted: false })
  const [isUpdating, setIsUpdating] = useState(false)
  const isWishlisted = wishlistState.productId === p?._id && wishlistState.isWishlisted

  const sliderRef = useRef(null)
  const resetSliderTimer = useRef(null)

  const images = (p?.images || [])
    .map((img) => typeof img === "string" ? img : img?.url)
    .filter(Boolean)
  const mobileImages = images.length > 1 ? [...images, images[0]] : images

  useEffect(() => {
    let isMounted = true

    if (!p?._id) return

    checkWishlistItem(p._id)
      .then(({ data }) => {
        if (isMounted) {
          setWishlistState({ productId: p._id, isWishlisted: data.exists === true })
        }
      })
      .catch((error) => {
        if (!isMounted) return

        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Unable to check wishlist status"

        dispatch(setToast({ success: false, message }))
      })

    return () => {
      isMounted = false
    }
  }, [p?._id, dispatch])

  useEffect(() => {
    if (images.length < 2) return undefined

    const timer = window.setInterval(() => {
      const slider = sliderRef.current
      if (!slider || document.visibilityState !== "visible" || !window.matchMedia("(max-width: 767px)").matches) return

      const lastImageOffset = slider.clientWidth * (images.length - 1)
      const nextOffset = slider.scrollLeft >= lastImageOffset - 2
        ? slider.clientWidth * images.length
        : slider.scrollLeft + slider.clientWidth
      slider.scrollTo({ left: nextOffset, behavior: "smooth" })
    }, 4000)

    return () => {
      window.clearInterval(timer)
      if (resetSliderTimer.current) window.clearTimeout(resetSliderTimer.current)
    }
  }, [images.length])

  const handleMobileSliderScroll = () => {
    const slider = sliderRef.current
    if (!slider || images.length < 2 || slider.scrollLeft < slider.clientWidth * images.length - 2) return
    if (resetSliderTimer.current) window.clearTimeout(resetSliderTimer.current)
    resetSliderTimer.current = window.setTimeout(() => {
      slider.scrollTo({ left: 0, behavior: "instant" })
    }, 450)
  }

  const toggleWishlist = async () => {
    if (!p?._id || isUpdating) return

    setIsUpdating(true)

    try {
      if (isWishlisted) {
        const response = await removeWishlistItem(p._id)

        setWishlistState({ productId: p._id, isWishlisted: false })
        dispatch(setToast({ success: true, message: response.data?.message || "Removed from wishlist." }))
      } else {
        const response = await addWishlistItem(p._id)

        setWishlistState({ productId: p._id, isWishlisted: true })
        dispatch(setToast({ success: true, message: response.data?.message || "Added to wishlist." }))
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again."

      dispatch(setToast({ success: false, message }))
    } finally {
      setIsUpdating(false)
    }
  }

  const changeImage = (direction) => {
    sliderRef.current?.scrollBy({
      left: direction * sliderRef.current.clientWidth,
      behavior: "smooth"
    })
  }

  const arrow =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"

  return (
    <div className="relative w-full md:w-[45%] md:shrink-0">
      <button
        type="button"
        onClick={toggleWishlist}
        disabled={isUpdating}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isWishlisted}
        className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2.5 shadow disabled:cursor-wait disabled:opacity-60"
      >
        <Heart
          size={24}
          strokeWidth={1.5}
          fill={isWishlisted ? "#ec4899" : "none"}
          color={isWishlisted ? "#ec4899" : "currentColor"}
        />
      </button>

      {/* Mobile Gallery */}
      <div className="relative md:hidden">
        <div
          ref={sliderRef}
          onScroll={handleMobileSliderScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
        >
          {mobileImages.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt={p?.title || "Product image"}
              className="aspect-[3/4] w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => changeImage(-1)}
              className={`${arrow} left-2`}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => changeImage(1)}
              className={`${arrow} right-2`}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Desktop Gallery */}
      <div className="hidden grid-cols-2 md:grid">
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={p?.title || "Product image"}
            className={`w-full object-cover ${
              wide(i)
                ? "col-span-2 aspect-[4/5]"
                : "aspect-[3/4]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}