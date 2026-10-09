import productModel from "../model/product.model.js"
import uploadFiles, { DeleteFiles } from "../services/storage.service.js"

export const createNewProductController = async (req, res) => {
    try {
        const { title, description, price, sizes } = req.body
        let files = req.files
        let imgUrls = []

        for (let i = 0; i < files.length; i++) {
            const response = await uploadFiles(files[i].buffer, files[i].originalname)
            imgUrls.push({ url: response.url, fileId: response.fileId })
        }

        const product = await productModel.create({
            title,
            description,
            price,
            sizes,
            images: imgUrls,
            seller: req.user.id
        })

        res.status(200).json({
            message: "product listed successfully",
            data: { product }
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const fetchAllProductController = async (req, res) => {
    try {

        const allProducts = await productModel.find()

        res.status(200).json({
            message: "all products data fetched successfully",
            data: {
                allProducts
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const fetchSingleProductController = async (req, res) => {
    try {

        const id = req.productId

        const product = await productModel.findById(id)

        if (!product) {
            return res.status(404).json({
                message: "Product Not FOUND"
            })
        }

        res.status(200).json({
            message: "Product Fetch Successfully",
            data: {
                product
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal Server error"
        })
    }
}

export const deleteProductController = async (req, res) => {

    try {

        const id = req.productId

        const deletedProduct = await productModel.findByIdAndDelete(id)

        for (let image of deletedProduct.images) {
            await DeleteFiles(image.fileId)
        }

        res.status(200).json({
            message: "product deleted successfully",
            data: {
                product: deletedProduct
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }

}

export const updateProductController = async (req, res) => {

}