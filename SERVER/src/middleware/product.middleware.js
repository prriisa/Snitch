import mongoose from "mongoose"
import productModel from "../model/product.model.js"

export const idValidator = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(404).json({
                message: "Product Id not found"
            })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        req.productId = id

        next()

    } catch (error) {
        console.log(error)
        return res.status(403).json({
            message: "internal server error"
        })
    }
}

export const isSeller = async (req, res, next) => {
    
    if (!req.user.role === "seller") {
        return res.status(400).json({
            message: "invalid request"
        })
    }

    let product = await productModel.findById(req.productId)

    if (!product) {
        return res.status(404).json({
            message: "product not found"
        })
    }
    
    if (!req.user.id === product.seller) {
        return res.status(403).json({
            message: "UnAuthorized user"
        })
    }
    next()
}