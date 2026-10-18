import { useSelector } from "react-redux"

export default function ProductDescription() {
  const description = useSelector((state) => state.singleProduct.product?.description)

  return <p className="text-black/60">{description}</p>
}