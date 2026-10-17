
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../api/productApi.jsx"
import { setSingleProduct, clearSingleProduct } from "../redux/Slice/singleProductSlice.jsx"
import Accordion from "../components/SingleProduct/Accordion.jsx"
import AddButton from "../components/SingleProduct/AddButton.jsx"
import ProductHeader from "../components/SingleProduct/ProductHeader.jsx"
import ProductGallery from "../components/SingleProduct/ProductsGallery.jsx"
import SizeSelector from "../components/SingleProduct/SizeSelector.jsx"

export default function SingleProductPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const p = useSelector((state) => state.singleProduct.product)

  const { id } = useParams()

  useEffect(() => {
    const singleProductFetch = async () => {
      if (!id) {
        setError("Product ID is missing.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError("")

        const response = await fetchSingleProduct(id)
        const product = response.data?.data?.product

        if (!product) {
          dispatch(clearSingleProduct())
          setError("Product not found.")
          return
        }

        dispatch(setSingleProduct(product))
      } catch (error) {
        console.error("Product fetch error:", error)
        dispatch(clearSingleProduct())
        setError(
          error.response?.data?.message ||
          "Unable to load product. Please try again."
        )
      } finally {
        setLoading(false)
      }
    }

    singleProductFetch()
  }, [id, dispatch])

  if (loading) {
    return (
      <p className="mt-24 text-center">
        Loading product...
      </p>
    )
  }

  if (error || !p) {
    return (
      <p className="mt-24 text-center text-sm text-red-500">
        {error || "Product not found."}
      </p>
    )
  }

  return (
    <main className="pt-25 flex flex-col items-center justify-center gap-6 bg-white md:flex-row md:items-start md:gap-8 md:pb-10">
      <ProductGallery />

      <div className="w-full md:w-[45%] lg:w-[40%] md:sticky md:top-[100px] md:self-start md:px-5">
        <ProductHeader />

        <SizeSelector />

        <div className="hidden pb-2 md:block">
          <AddButton />
        </div>

        <div className="my-4 border-t">
          <Accordion title="Delivery" open>
            <div className="flex justify-between border border-[#b8b8b8] px-5 py-1.5">
              <input
                type="tel"
                placeholder="Enter Pincode"
                className="flex-1 bg-transparent text-xs outline-none"
              />

              <button className="font-bold text-[#e54b29]">
                CHECK
              </button>
            </div>

            <p className="mt-3 bg-[#F5A593] px-4 py-2 text-[#333]">
              Please select your size to check delivery date
            </p>
          </Accordion>

          <Accordion title="Description & Fit">
            <p className="text-black/60">
              {p.description}
            </p>
          </Accordion>

          <Accordion title="Reviews">
            <p className="text-xs font-light">
              No reviews for this style yet.
            </p>
          </Accordion>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[480px] p-4 md:hidden">
        <AddButton />
      </div>
    </main>
  )
}