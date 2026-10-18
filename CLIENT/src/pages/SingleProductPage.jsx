import { useEffect } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleProduct } from "../api/productApi.jsx"
import { setSingleProduct, clearSingleProduct, setProductLoading, setProductError } from "../redux/Slice/singleProductSlice.jsx"
import Accordion from "../components/SingleProduct/Accordion.jsx"
import AddButton from "../components/SingleProduct/AddButton.jsx"
import ProductHeader from "../components/SingleProduct/ProductHeader.jsx"
import ProductGallery from "../components/SingleProduct/ProductsGallery.jsx"
import ProductDescription from "../components/SingleProduct/ProductDescription.jsx"
import SizeSelector from "../components/SingleProduct/SizeSelector.jsx"

export default function SingleProductPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { product, loading, error } = useSelector((state) => state.singleProduct)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        dispatch(clearSingleProduct())
        dispatch(setProductError("Product ID is missing."))
        return
      }

      dispatch(clearSingleProduct())
      dispatch(setProductLoading())

      try {
        const response = await fetchSingleProduct(id)
        const data = response.data?.data?.product

        if (!data) return dispatch(setProductError("Product not found."))
        dispatch(setSingleProduct(data))
      
      } catch (error) {
        console.error("Product fetch error:", error)
        dispatch(setProductError(error.response?.data?.message || "Unable to load product. Please try again."))
      }
    }

    fetchProduct()
  }, [id, dispatch])

  if (loading) return <p className="mt-24 text-center">Loading product...</p>
  if (error || !product) return <p className="mt-24 text-center text-sm text-red-500">{error || "Product not found."}</p>

  return (
    <main className="flex flex-col items-center justify-center gap-6 bg-white pt-25 md:flex-row md:items-start md:gap-8 md:pb-10">
      <ProductGallery />

      <div className="w-full md:sticky md:top-[100px] md:w-[45%] md:self-start md:px-5 lg:w-[40%]">
        <ProductHeader />
        <SizeSelector />

        <div className="hidden pb-2 md:block">
          <AddButton />
        </div>

        <div className="my-4 border-t">
          <Accordion title="Delivery" open>
            <div className="flex justify-between border border-[#b8b8b8] px-5 py-1.5">
              <input type="tel" placeholder="Enter Pincode" className="flex-1 bg-transparent text-xs outline-none" />
              <button className="font-bold text-[#e54b29]">CHECK</button>
            </div>
            <p className="mt-3 bg-[#F5A593] px-4 py-2 text-[#333]">
              Please select your size to check delivery date
            </p>
          </Accordion>

          <Accordion title="Description & Fit">
            <ProductDescription />
          </Accordion>

          <Accordion title="Reviews">
            <p className="text-xs font-light">No reviews for this style yet.</p>
          </Accordion>
        </div>
      </div>

      <div className="fixed bottom-0 w-full max-w-[480px] p-4 md:hidden">
        <AddButton />
      </div>
    </main>
  )
}