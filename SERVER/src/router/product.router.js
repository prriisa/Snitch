import express, { Router } from "express"
import authenticate from "../middleware/auth.middleware.js"
import { createNewProductController, fetchAllProductController } from "../controller/product.controller.js"
import { productValidator } from "../validator/product.validator.js"
import upload from "../config/multer.js"

const router = Router()

router.post(

    // created url `/create` for listing product

    "/create",

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

    // creating buffer of images with multer

    upload.array("images", 5),

    // parsing the json data of price and sizes

    (req, res, next) => {
        req.body.price = JSON.parse(req.body.price)
        req.body.sizes = JSON.parse(req.body.sizes)

        next()
    },

    // product validator which validates the input fields

    productValidator,

    // create new product controller
    
    createNewProductController)



router.get("/all" , fetchAllProductController)

export default router