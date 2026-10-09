import cartModel from "../model/cart.model.js"
import productModel from "../model/product.model.js"

export const addToCartController = async (req, res) => {
    try {

        const { product, quantity, size } = req.body

        let isProductExists = await productModel.findById(product)

        if (!isProductExists) {
            return res.status(400).json({
                message: "product not found"
            })
        }

        let selectedSize = isProductExists.sizes.find((pSize) => pSize.size === size)

        if (!selectedSize) {
            return res.status(400).json({
                message: "size not availabe with this product"
            })
        }

        let stockAvailable = selectedSize.stock

        if (stockAvailable < quantity) {
            return res.status(400).json({
                message: "available stock is less"
            })
        }

        let cart = await cartModel.findOne({ user: req.user.id })


        if (!cart) {
            cart = await cartModel.create({
                products: [{
                    product,
                    quantity,
                    size
                }],
                user: req.user.id
            })
        }
        else {
            const existingItem = cart.products.find(
                (item) =>
                    item.product.toString() === product &&
                    item.size === size
            );

            if (existingItem) {
                existingItem.quantity += quantity
            }
            else {
                cart.products.push({
                    product,
                    quantity,
                    size
                });
            }

            await cart.save();

        }
        await cart.populate("products.product")

        res.status(201).json({
            message: "product added to cart successfully",
            data: {
                cart
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const fetchAllCartItemsController = async (req, res) => {
}

export const updateCartValidator = async (req, res) => {

}