import express, { Router } from "express"
import authenticate from "../middleware/auth.middleware.js"
import { createNewProductController } from "../controller/product.controller.js"
import { productValidator } from "../validator/product.validator.js"
import upload from "../config/multer.js"

const router = Router()

router.post(
    "/create",
    authenticate,
    (req, res, next => {
        const { userData } = req.user

        if (userData.role !== "seller") {
            return res.status(403).json({
                message: "invalid request"
            })
        }

        next()
    }),
    upload,
    productValidator,
    createNewProductController
)