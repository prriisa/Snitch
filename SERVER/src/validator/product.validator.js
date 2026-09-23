import { body, validationResult } from "express-validator"

export const productValidator = [
    body("title")
        .exists().withMessage("title is required").bail()
        .isString().withMessage("title must be a string").bail()
        .trim().isLength({min:3, max:100}).withMessage("title must be between 3 to 100 characters"),


    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim().isLength({min:3, max:500}).withMessage("description must be between 3 to 500 characters"),


    body("price")
        .exists().withMessage("price is required").bail(),


    body("price.amount")
        .exists().withMessage("product amount is required").bail()
        .isFloat({min:0}).withMessage("amount must be a floating value and greater than 0").bail(),


    body("price.currency")
        .exists().withMessage("currency is required").bail()
        .isString().withMessage("currency must be a string").bail()
        .trim()
        .isIn(["INR", "USD"]).withMessage("price must be in INR or USD"),


    body("sizes")
        .exists().withMessage("size is required").bail()
        .isArray().withMessage("sizes must be in array"),


    body("sizes.*.size")
        .exists().withMessage("size is required").bail()
        .isString().withMessage("size must be a string value").bail()
        .trim()
        .isIn(["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]).withMessage("sizes can be XS, S, M, L, XL, XXL, XXXL, Free Size"),


    body("sizes.*.stock")
        .exists().withMessage("product stock is required").bail()
        .isInt({min:0}).withMessage("Stock must be a integer >= 0"),


    (req, res, next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                error:errors
            })
        }
        next()
    }
]