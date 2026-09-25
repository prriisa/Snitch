import productModel from "../model/product.model.js"

export const addToCartController = async (req, res) => {
    try {

        const { product, quantity, size } = req.body

        let isProductExists = await productModel.findById(product)

        if(!isProductExists){
            return res.status(400).json({
                message:"product not found"
            })
        }

        let selectedSize = isProductExists.sizes.find((pSize) => pSize === size)

        if(!selectedSize){
            return res.status(400).json({
                message:"size not availabe with this product"
            })
        }

        let stockAvailable = selectedSize.stock

        if(stockAvailable < quantity){
            return res.status(400).json({
                message:"available stock is less"
            })
        }

        let cart = await cartModel.create({
            products: {
                product,
                quantity,
                size
            },
            user: req.user.id
        })

        res.status(201).json({
            message:"product added to cart successfully",
            data:{
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