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
                existingItem.quantity = quantity
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
    try {
        const userData = req.user

        if (!userData) {
            return res.status(400).json({
                message: "USER NOT FOUND"
            })
        }

        const cart = await cartModel.findOne({ user: userData.id }).populate("products.product")

        if (!cart) {
            return res.status(404).json({
                message: "cart not found"
            })
        }

        if (cart.products.length === 0) {
            return res.status(200).json({
                message: "no item in cart",
                data: null
            })
        }

        res.status(200).json({
            message: "cart found successfully",
            data: {
                products: cart.products
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const manageQuantityController = async (req, res) => {
    try {
        const cartItemId = req.cartItemId
        const user = req.user
        const { action } = req.body

        const cart = await cartModel.findOne({ user: user.id }).populate("products.product")

        const cartItem = cart.products.find((p) => p._id.toString() === cartItemId)

        if (action === "increment") {
            const selectedSize = cartItem.product.sizes.find((s) => s.size === cartItem.size)

            if (!selectedSize || cartItem.quantity >= selectedSize.stock) {
                return res.status(400).json({
                    message: "product quantity limit reached"
                })
            }

            cartItem.quantity += 1
        }

        if (action === "decrement") {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1
            } else {
                return res.status(400).json({
                    message: "cartItem quantity can't be decreased"
                })
            }
        }

        await cart.save()

        res.status(200).json({
            message: "Cart quantity updated successfully",
            data: { cart }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const deleteCartItemController = async (req, res) => {

    const cartItemId = req.cartItemId
    const user = req.user

    try {
        const cart = await cartModel.findOne({ user: user.id }).populate("products.product")

        cart.products = cart.products.filter((p) => p._id.toString() !== cartItemId)

        await cart.save()

        res.status(200).json({
            message: "product removed from cart success fully",
            data: { cart }
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const manageSizeController = async (req, res) => {
    try {
        const cartItemId = req.cartItemId
        const user = req.user
        const { size } = req.body

        const cart = await cartModel.findOne({ user: user.id }).populate("products.product")

        const cartItem = cart.products.find((p) => p._id.toString() === cartItemId)

        const selectedSize = cartItem.product.sizes.find((s) => s.size === size)

        if(!selectedSize){
            return res.status(400).json({
                message:"product size not available"
            })
        }

        cartItem.size = size

        if(selectedSize.stock < cartItem.quantity){

            cartItem.quantity = selectedSize.stock
        }
        
        await cart.save()

        res.status(200).json({
            message: "Cart size updated successfully",
            data: { cart }
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }

}
