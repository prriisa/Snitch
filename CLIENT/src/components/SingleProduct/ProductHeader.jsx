import { useSelector } from "react-redux"

export default function ProductHeader() {
  const p = useSelector((state) => state.singleProduct.product)
  
  return (
    <div className="my-4">
      <div className="mx-4 md:mx-0">
        <h1 className="text-sm md:text-base font-light">{p.title}</h1>

        <p className="mt-1 text-sm md:text-lg font-bold">
          {p.price?.currency === "INR" ? "₹" : p.price?.currency}
          {p.price?.amount}
        </p>

        <p className="text-xs font-light text-black/60">
          *MRP Inclusive of all taxes
        </p>

        <p className="mt-2 text-sm font-light text-black/60">
          {p.description}
        </p>
      </div>
    </div>
  )
}