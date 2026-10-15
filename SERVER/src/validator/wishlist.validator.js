import { param, validationResult } from "express-validator";

export const wishlistValidator = [
    param("id")
        .exists().withMessage("product Id is required").bail()
        .isString().withMessage("product ID must be a string").bail()
        .trim()
        .isMongoId().withMessage("product id must be valid"),


    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request"
            })
        }
        next()
    }
]