import productModel from "../model/product.model.js"
import uploadFiles from "../services/storage.service.js"

export const createNewProductController = async (req, res) => {
    try {
        const { title, description, price, sizes } = req.body
        let files = req.files
        let imgUrls = []

        for (let i = 0; i < files.length; i++) {
            const response = await uploadFiles(files[i].buffer, files[i].originalname)
            imgUrls.push(response.url)
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
            message:"product listed successfully",
            data: {product}
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const fetchAllProductController = async(req, res) => {
    try {

        const allProducts = await productModel.find()

        res.status(200).json({
            message:"all products data fetched successfully",
            data:{
                allProducts
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"internal server error"
        })
    }
}