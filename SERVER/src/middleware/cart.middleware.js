import mongoose from "mongoose"
import cartModel from "../model/cart.model.js"

export const cartItemIdValidator = async (req, res, next) => {
    const { cartItemId } = req.params
    const user = req.user

    try {
        if (!cartItemId) {
            return res.status(404).json({
                message: "cart Item Id not Found"
            })
        }

        if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
            return res.status(400).json({
                message: "Invalid cartItem Id"
            })
        }

        const cart = await cartModel.findOne({ user: user.id })

        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found"
            })
        }

        const isInCart = cart.products.find((p) => p._id.toString() === cartItemId)

        if (!isInCart) {
            return res.status(404).json({
                message: "Product Not Found In Cart"
            })
        }

        req.cartItemId = cartItemId

        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}