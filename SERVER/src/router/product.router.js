import authenticate from "../middleware/auth.middleware.js"
import { createNewProductController, deleteProductController, fetchAllProductController, fetchSingleProductController, updateProductController } from "../controller/product.controller.js"
import { productValidator } from "../validator/product.validator.js"
import upload from "../config/multer.js"
import { idValidator, isSeller } from "../middleware/product.middleware.js"
import { Router } from "express"
import productModel from "../model/product.model.js"

const router = Router()

router.post(    "/create",

    // authenticate user with tokens

    authenticate,

    // checking if the role of of user is seller or not

    (req, res, next) => {
        const { role } = req.user

        if (role !== "seller") {
            return res.status(403).json({
                message: "invalid request"
            })
        }

        next()
    },

    async (req, res, next) => {
        const idempotencyKey = req.get("Idempotency-Key")
        if (!idempotencyKey) return next()
        if (!/^[a-zA-Z0-9_-]{16,100}$/.test(idempotencyKey)) {
            return res.status(400).json({ message: "Invalid product request key." })
        }

        try {
            const existingProduct = await productModel.findOne({ idempotencyKey, seller: req.user.id })
            if (existingProduct) {
                return res.status(200).json({ message: "Product already listed.", data: { product: existingProduct } })
            }
            return next()
        } catch (error) {
            return next(error)
        }
    },

    // creating buffer of images with multer

    upload.array("images", 5),

    // parsing the json data of price and sizes

    (req, res, next) => {
        try {
            req.body.price = JSON.parse(req.body.price)
            req.body.sizes = JSON.parse(req.body.sizes)
            next()
        } catch {
            return res.status(400).json({ message: "Invalid price or sizes format" })
        }
    },

    // product validator which validates the input fields

    productValidator,

    // create new product controller

    createNewProductController)

router.get("/", fetchAllProductController)

router.get("/:id", idValidator, fetchSingleProductController)

router.delete("/:id/delete",

    idValidator,

    authenticate,

    isSeller,

    deleteProductController)

router.patch("/:id/update",
    idValidator,

    authenticate,

    isSeller,

    upload.array("newImages", 5),

    (req, res, next) => {
        try {
            req.body.price = JSON.parse(req.body.price)
            req.body.sizes = JSON.parse(req.body.sizes)
            req.body.images = JSON.parse(req.body.images)
            next()
        } catch (error) {
            return res.status(400).json({
                message: "Invalid price or sizes format",
            })
        }
    },
    productValidator,

    updateProductController
)

export default router