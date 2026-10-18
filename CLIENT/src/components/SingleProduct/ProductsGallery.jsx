import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { useSelector } from "react-redux"
import {
  checkWishlistItem,
  addWishlistItem,
  removeWishlistItem
} from "../../api/wishlistApi.jsx"

const wide = (i) => [0, 3, 4].includes(i % 7)

export default function ProductGallery() {
  const p = useSelector((state) => state.singleProduct.product)

  const [isWishlisted, setIsWishlisted] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const sliderRef = useRef(null)
  const alertTimer = useRef(null)

  const images = (p?.images || [])
    .map((img) => typeof img === "string" ? img : img?.url)
    .filter(Boolean)

  const showWishlistAlert = (message) => {
    if (alertTimer.current) {
      clearTimeout(alertTimer.current)
    }

    setAlertMessage(message)
    setShowAlert(true)

    alertTimer.current = setTimeout(() => {
      setShowAlert(false)
      setAlertMessage("")
      alertTimer.current = null
    }, 2000)
  }

  useEffect(() => {
    let isMounted = true

    setIsWishlisted(false)

    if (!p?._id) return

    checkWishlistItem(p._id)
      .then(({ data }) => {
        if (isMounted) {
          setIsWishlisted(data.exists === true)
        }
      })
      .catch((error) => {
        if (!isMounted) return

        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Unable to check wishlist status"

        console.error("Wishlist check failed:", message)
        showWishlistAlert(message)
      })

    return () => {
      isMounted = false
    }
  }, [p?._id])

  useEffect(() => {
    return () => {
      if (alertTimer.current) {
        clearTimeout(alertTimer.current)
      }
    }
  }, [])

  const toggleWishlist = async () => {
    if (!p?._id || isUpdating) return

    setIsUpdating(true)

    try {
      if (isWishlisted) {
        const response = await removeWishlistItem(p._id)

        setIsWishlisted(false)
        showWishlistAlert(
          response.data?.message || "Removed from wishlist"
        )
      } else {
        const response = await addWishlistItem(p._id)

        setIsWishlisted(true)
        showWishlistAlert(
          response.data?.message || "Added to wishlist"
        )
      }
    } catch (error) {
      console.error("Wishlist API error:", error)

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again."

      showWishlistAlert(message)
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
      {showAlert && (
        <div
          role="alert"
          className="fixed left-2/3 top-5 z-[9999] -translate-x-1/2 rounded-lg bg-black px-5 py-3 text-sm text-white shadow-lg"
        >
          {alertMessage}
        </div>
      )}

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
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
        >
          {images.map((src, i) => (
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