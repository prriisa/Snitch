import {body, validationResult} from "express-validator"

export const addToCartValidator = [

    body("product")
        .exists().withMessage("product Id is required").bail()
        .isString().withMessage("product ID must be a string").bail()
        .trim()
        .isMongoId().withMessage("product id must be valid"),


    body("quantity")
        .exists().withMessage("quantity is required").bail()
        .isInt({min:1, max:20}).withMessage("quantity must be an integer greater than 1"),


    body("size")
        .exists().withMessage("size is required").bail()
        .isString().withMessage("size must be a string type").bail()
        .trim()
        .isIn(["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]).withMessage("sizes only can be xs, s, l, xl, xxl, xxxl, free size"),



    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request"
            })
        }

        next()

    }

]