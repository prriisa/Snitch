import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ImagePlus, Plus, Trash2, X } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { createProduct, fetchAllProducts, updateProduct } from "../api/productApi"
import { normalizeProductCategory, productCategories } from "../utils/productCategories"

const availableSizes = ["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const ProductFormPage = () => {
    const { id } = useParams()
    const isEditing = Boolean(id)
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const [sizes, setSizes] = useState([{ size: "M", stock: 1 }])
    const [images, setImages] = useState([])
    const [isLoadingProduct, setIsLoadingProduct] = useState(isEditing)
    const [hasLoadedProduct, setHasLoadedProduct] = useState(!isEditing)
    const [formError, setFormError] = useState("")
    const objectUrls = useRef(new Set())
    const [createRequestKey, setCreateRequestKey] = useState("")
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onChange",
        defaultValues: { title: "", description: "", amount: "", currency: "INR", gender: "unisex", category: "Other" }
    })

    const imageCount = images.length
    const sizeOptions = availableSizes

    useEffect(() => {
        if (!isEditing) return undefined
        let isMounted = true
        const loadProduct = async () => {
            setIsLoadingProduct(true)
            setFormError("")
            try {
                const response = await fetchAllProducts()
                const product = response.data?.data?.allProducts?.find((item) => item._id === id)
                if (!product || String(product.seller?._id || product.seller) !== String(user?.id)) {
                    throw new Error("Product not found in your seller account.")
                }
                if (!isMounted) return
                reset({
                    title: product.title || "",
                    description: product.description || "",
                    amount: product.price?.amount ?? "",
                    currency: product.price?.currency || "INR",
                    gender: product.gender === "neutral" ? "unisex" : product.gender || "unisex",
                    category: normalizeProductCategory(product.category || "Other")
                })
                setSizes((product.sizes || []).map(({ size, stock }) => ({ size, stock })))
                setImages((product.images || []).map((image) => ({ type: "existing", fileId: image.fileId, url: image.url })))
                setHasLoadedProduct(true)
            } catch (requestError) {
                if (isMounted) setFormError(requestError.response?.data?.message || requestError.message || "Could not load this product.")
            } finally {
                if (isMounted) setIsLoadingProduct(false)
            }
        }
        loadProduct()
        return () => { isMounted = false }
    }, [id, isEditing, reset, user?.id])

    useEffect(() => () => {
        objectUrls.current.forEach((url) => URL.revokeObjectURL(url))
        objectUrls.current.clear()
    }, [])

    const handleImageSelection = (event) => {
        const selectedFiles = Array.from(event.target.files || [])
        event.target.value = ""
        if (selectedFiles.some((file) => file.size > 1024 * 1024)) {
            setFormError("Each image must be smaller than 1 MB.")
            return
        }
        if (imageCount + selectedFiles.length > 5) {
            setFormError("You can add up to 5 product images.")
            return
        }
        setFormError("")
        const newImages = selectedFiles.map((file) => {
            const url = URL.createObjectURL(file)
            objectUrls.current.add(url)
            return { type: "new", file, url }
        })
        setImages((current) => [
            ...current,
            ...newImages
        ])
    }

    const removeImage = (index) => {
        setImages((current) => {
            const removedImage = current[index]
            if (removedImage?.type === "new") {
                URL.revokeObjectURL(removedImage.url)
                objectUrls.current.delete(removedImage.url)
            }
            return current.filter((_, imageIndex) => imageIndex !== index)
        })
    }

    const addSize = () => {
        const nextSize = sizeOptions.find((size) => !sizes.some((item) => item.size === size))
        if (nextSize) setSizes((current) => [...current, { size: nextSize, stock: 1 }])
    }

    const updateSize = (index, key, value) => {
        setSizes((current) => current.map((item, itemIndex) => itemIndex === index
            ? { ...item, [key]: key === "stock" ? (value === "" ? "" : Number(value)) : value }
            : item))
    }

    const onSubmit = async (data) => {
        setFormError("")
        if (!sizes.length || sizes.some((item) => !Number.isInteger(item.stock) || item.stock < 0)) {
            setFormError("Add at least one size and enter a valid stock quantity.")
            return
        }
        if (!images.length) {
            setFormError("Add at least one product image.")
            return
        }

        const formData = new FormData()
        formData.append("title", data.title.trim())
        formData.append("description", data.description.trim())
        formData.append("price", JSON.stringify({ amount: Number(data.amount), currency: data.currency }))
        formData.append("sizes", JSON.stringify(sizes.map(({ size, stock }) => ({ size, stock: Number(stock) }))))
        formData.append("gender", data.gender)
        formData.append("category", data.category)

        if (isEditing) {
            formData.append("images", JSON.stringify(images.map((image) => image.type === "existing"
                ? { type: "existing", fileId: image.fileId }
                : { type: "new" })))
            images.filter((image) => image.type === "new").forEach((image) => formData.append("newImages", image.file))
        } else {
            images.forEach((image) => formData.append("images", image.file))
        }

        try {
            if (isEditing) await updateProduct(id, formData)
            else {
                let requestKey = createRequestKey
                if (!requestKey) {
                    if (window.crypto?.randomUUID) {
                        requestKey = window.crypto.randomUUID()
                    } else {
                        const bytes = new Uint8Array(16)
                        window.crypto.getRandomValues(bytes)
                        requestKey = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
                    }
                    setCreateRequestKey(requestKey)
                }
                await createProduct(formData, requestKey)
            }
            navigate("/seller/products", { replace: true })
        } catch (requestError) {
            setFormError(requestError.response?.data?.message || "Could not save your product. Check the details and try again.")
        }
    }

    return (
        <main className="min-h-screen bg-[#f7f7f7] px-4 pb-24 pt-24 text-black md:px-10 md:pt-32">
            <div className="mx-auto max-w-4xl">
                <Link to="/seller/products" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-600 hover:text-black">
                    <ArrowLeft size={16} /> Back to products
                </Link>
                <div className="mb-8 border-b border-black pb-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-neutral-500">Seller studio</p>
                    <h1 className="text-3xl font-semibold uppercase tracking-wide md:text-4xl">{isEditing ? "Edit product" : "Create product"}</h1>
                    <p className="mt-2 text-sm text-neutral-600">Keep product details and inventory up to date.</p>
                </div>

                {isLoadingProduct ? (
                    <div className="h-96 animate-pulse bg-neutral-200" />
                ) : isEditing && !hasLoadedProduct ? (
                    <div className="bg-white p-6">
                        <p role="alert" className="text-sm text-red-700">{formError || "Could not load this product."}</p>
                        <Link to="/seller/products" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-[#e64b2b]">
                            <ArrowLeft size={16} /> Return to your products
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-5 md:p-8">
                        <div className="grid gap-5 md:grid-cols-2">
                            <label className="block text-xs font-medium uppercase tracking-widest md:col-span-2">
                                Product name
                                <input
                                    {...register("title", { required: "Product name is required.", minLength: { value: 3, message: "Use at least 3 characters." }, maxLength: { value: 100, message: "Use no more than 100 characters." } })}
                                    className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-black"
                                    placeholder="e.g. Relaxed Fit Overshirt"
                                />
                                {errors.title && <span className="mt-1 block normal-case tracking-normal text-red-600">{errors.title.message}</span>}
                            </label>

                            <label className="block text-xs font-medium uppercase tracking-widest md:col-span-2">
                                Description
                                <textarea
                                    {...register("description", { required: "Description is required.", minLength: { value: 3, message: "Use at least 3 characters." }, maxLength: { value: 500, message: "Use no more than 500 characters." } })}
                                    rows={4}
                                    className="mt-2 w-full resize-y border border-neutral-300 px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-black"
                                    placeholder="Describe the fit, fabric, and details."
                                />
                                {errors.description && <span className="mt-1 block normal-case tracking-normal text-red-600">{errors.description.message}</span>}
                            </label>

                            <label className="block text-xs font-medium uppercase tracking-widest">
                                Price
                                <input
                                    {...register("amount", { required: "Price is required.", valueAsNumber: true, min: { value: 0.01, message: "Price must be greater than zero." } })}
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    className="mt-2 w-full border border-neutral-300 px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-black"
                                    placeholder="0.00"
                                />
                                {errors.amount && <span className="mt-1 block normal-case tracking-normal text-red-600">{errors.amount.message}</span>}
                            </label>
                            <label className="block text-xs font-medium uppercase tracking-widest">
                                Currency
                                <select {...register("currency", { required: true })} className="mt-2 w-full border border-neutral-300 bg-white px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-black">
                                    <option value="INR">INR - Indian Rupee</option>
                                    <option value="USD">USD - US Dollar</option>
                                </select>
                            </label>
                            <label className="block text-xs font-medium uppercase tracking-widest">
                                Gender
                                <select {...register("gender", { required: true })} className="mt-2 w-full border border-neutral-300 bg-white px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-black">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </label>
                            <label className="block text-xs font-medium uppercase tracking-widest">
                                Category
                                <select {...register("category", { required: true })} className="mt-2 w-full border border-neutral-300 bg-white px-3 py-3 text-sm normal-case tracking-normal outline-none focus:border-black">
                                    {productCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <section>
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xs font-medium uppercase tracking-widest">Sizes and stock</h2>
                                    <p className="mt-1 text-xs text-neutral-500">Set stock separately for each size.</p>
                                </div>
                                <button type="button" onClick={addSize} disabled={sizes.length >= sizeOptions.length} className="inline-flex items-center gap-1 text-xs uppercase tracking-widest hover:text-[#e64b2b] disabled:opacity-40">
                                    <Plus size={15} /> Add size
                                </button>
                            </div>
                            <div className="space-y-2">
                                {sizes.map((item, index) => (
                                    <div key={`${item.size}-${index}`} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                                        <select value={item.size} onChange={(event) => updateSize(index, "size", event.target.value)} className="min-w-0 border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-black">
                                            {sizeOptions.map((size) => <option key={size} value={size} disabled={sizes.some((current, currentIndex) => current.size === size && currentIndex !== index)}>{size}</option>)}
                                        </select>
                                        <input aria-label={`Stock for size ${item.size}`} type="number" min="0" step="1" value={item.stock} onChange={(event) => updateSize(index, "stock", event.target.value)} className="w-full border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-black" placeholder="Stock" />
                                        <button type="button" aria-label={`Remove size ${item.size}`} onClick={() => setSizes((current) => current.filter((_, currentIndex) => currentIndex !== index))} className="p-2 text-neutral-500 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {!sizes.length && <p className="border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">Add at least one size to list the product.</p>}
                            </div>
                        </section>

                        <section>
                            <div className="mb-3 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xs font-medium uppercase tracking-widest">Product images</h2>
                                    <p className="mt-1 text-xs text-neutral-500">{imageCount}/5 images · JPG, PNG, or WebP up to 1 MB each</p>
                                </div>
                                <label className={`inline-flex cursor-pointer items-center gap-2 text-xs uppercase tracking-widest hover:text-[#e64b2b] ${imageCount >= 5 ? "pointer-events-none opacity-40" : ""}`}>
                                    <ImagePlus size={16} /> Add images
                                    <input type="file" accept="image/*" multiple disabled={imageCount >= 5} onChange={handleImageSelection} className="sr-only" />
                                </label>
                            </div>
                            {images.length ? (
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                                    {images.map((image, index) => (
                                        <div key={image.type === "existing" ? image.fileId : `${image.file.name}-${index}`} className="relative aspect-[3/4] bg-neutral-100">
                                            <img src={image.url} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                                            <button type="button" aria-label={`Remove image ${index + 1}`} onClick={() => removeImage(index)} className="absolute right-2 top-2 bg-white p-1.5 shadow">
                                                <X size={15} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center border border-dashed border-neutral-300 text-neutral-500 hover:border-black hover:text-black">
                                    <ImagePlus size={22} />
                                    <span className="mt-2 text-xs uppercase tracking-widest">Select product images</span>
                                    <input type="file" accept="image/*" multiple onChange={handleImageSelection} className="sr-only" />
                                </label>
                            )}
                        </section>

                        {formError && <p role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{formError}</p>}
                        <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
                            <Link to="/seller/products" className="px-5 py-3 text-center text-xs uppercase tracking-widest text-neutral-600 hover:text-black">Cancel</Link>
                            <button type="submit" disabled={isSubmitting || !images.length || isLoadingProduct} className="bg-black px-6 py-3 text-xs font-medium uppercase tracking-widest text-white hover:bg-[#e64b2b] disabled:cursor-not-allowed disabled:opacity-50">
                                {isSubmitting ? "Saving..." : isEditing ? "Save changes" : "Create product"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    )
}

export default ProductFormPage
