import wishlistModel from "../model/wishlist.model.js"
import productModel from "../model/product.model.js"

export const fetchWishlistController = async (req, res) => {
    try {
        const userData = req.user

        if (!userData) {
            return res.status(400).json({
                message: "USER NOT FOUND"
            })
        }

        const wishlist = await wishlistModel.findOne({ user: userData.id }).populate("products")

        if (!wishlist) {
            return res.status(404).json({
                message: "wishlist not found"
            })
        }

        if (wishlist.products.length === 0) {
            return res.status(400).json({
                message: "no item in wishlist",
                data:[]
            })
        }

        res.status(200).json({
            message: "wishlist found successfully",
            data: {
                products: wishlist.products
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

export const addToWishlistController = async (req, res) => {
    try {
        const { id } = req.params

        let isProductExists = await productModel.findById(id)

        if (!isProductExists) {
            return res.status(400).json({
                message: "product not found"
            })
        }

        let wishlist = await wishlistModel.findOne({ user: req.user.id })

        if (!wishlist) {
            wishlist = await wishlistModel.create({
                products: [id],
                user: req.user.id
            })
        }
        else {
            const existingItem = wishlist.products.find(
                (item) =>
                    item.toString() === id
            )

            if (existingItem) {
                return res.status(400).json({
                    message: "product is already in wishlist"
                })
            }
            else {
                wishlist.products.push(id)
            }

            await wishlist.save()

        }
        await wishlist.populate("products")

        res.status(201).json({
            message: "product added to wishlist successfully",
            data: {
                wishlist
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }

}

export const removeFromWishlistController = async (req, res) => {
    try {
        const { id } = req.params

        const wishlist = await wishlistModel.findOne({ user: req.user.id })

        if (!wishlist) {
            return res.status(404).json({
                message: "wishlist not found"
            })
        }

        const existingItem = wishlist.products.find(
            (item) => item.toString() === id
        )

        if (!existingItem) {
            return res.status(404).json({
                message: "product not found in wishlist"
            })
        }

        wishlist.products.pull(id)

        await wishlist.save()

        return res.status(200).json({
            message: "product removed from wishlist successfully",
            data: {
                wishlist
            }
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "internal server error"
        })
    }
}