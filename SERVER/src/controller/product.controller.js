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
        console.log(error);

        for (const image of uploadedImgs) {
            try {
                await DeleteFiles(image.fileId);
            } catch (deleteError) {
                console.log("Uploaded image cleanup failed:", deleteError);
            }
        }

        return res.status(500).json({
            message: "internal server error"
        });
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
    try {
        const product = await productModel.findById(req.productId)

        if (!product) {
            return res.status(404).json({
                message: "Product not Found"
            })
        }

        const { title, description, price, sizes, images } = req.body
        const newImages = req.files || []

        const parsedImages = JSON.parse(images)

        if (parsedImages.length > 5) {
            return res.status(400).json({
                message: "A product can have at most 5 images",
            });
        }

        const formDataExistingFileIds = parsedImages.filter(img => img.type === "existing").map(img => img.fileId)

        const productFileIds = product.images.map(img => img.fileId)

        const invalidFileId = formDataExistingFileIds.some(fileId => !productFileIds.includes(fileId))

        if (invalidFileId) {
            return res.status(400).json({
                message: "Invalid existing image"
            })
        }

        const newImageEntries = parsedImages.filter(img => img.type === "new")

        if (newImageEntries.length !== newImages.length) {
            return res.status(400).json({
                message: "New images count mismatch"
            })
        }

        const finalImages = parsedImages.filter(img => img.type === "existing").map(img => product.images.find(pImg => pImg.fileId === img.fileId))

        if (finalImages.length + newImages.length > 5) {
            return res.status(400).json({
                message: "A product can have at most 5 images",
            });
        }

        const uploadedImgs = []

        for (let img of newImages) {
            let response = await uploadFiles(img.buffer, img.originalname)

            uploadedImgs.push({
                url: response.url,
                fileId: response.fileId
            })
        }

        finalImages.push(...uploadedImgs)

        const removedImages = product.images.filter(dbImg => !finalImages.some(fImg => fImg.fileId === dbImg.fileId))

        product.title = title
        product.description = description
        product.price = price
        product.sizes = sizes
        product.images = finalImages

        await product.save()

        for (const image of removedImages) {
            try {
                await DeleteFiles(image.fileId);
            } catch (error) {
                console.log("ImageKit deletion failed:", error);
            }
        }


        res.status(200).json({
            message: "product updated successfully",
            data: { product }
        })

    } catch (error) {
        console.log(error);

        for (const image of uploadedImgs) {
            try {
                await DeleteFiles(image.fileId);
            } catch (deleteError) {
                console.log("Uploaded image cleanup failed:", deleteError);
            }
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}