import express, { Router } from "express"
import authenticate from "../middleware/auth.middleware.js"
import { createNewProductController } from "../controller/product.controller.js"
import { productValidator } from "../validator/product.validator.js"
import upload from "../config/multer.js"

const router = Router()

router.post(
    "/create",
    authenticate,
    (req, res, next) => {
        const { role } = req.user

        if (role !== "seller") {
            return res.status(403).json({
                message: "invalid request"
            })
        }

        next()
    },
    upload.array("images", 5),
    (req, res, next) => {
        req.body.price = JSON.parse(req.body.price)
        req.body.sizes = JSON.parse(req.body.sizes)

        next()
    },
    productValidator,
    createNewProductController)

export default router