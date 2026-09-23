import { body, validationResult } from "express-validator"

export const registerValidator = [
    body("email")
        .exists().withMessage("email is required").bail()
        .isString().withMessage("email must be a string").bail()
        .trim().isLength({ min: 1 }).withMessage("email is required").bail()
        .isEmail().withMessage("invalid email entered"),


    body("name")
        .exists().withMessage("name is required").bail()
        .isString().withMessage("name must be a sting").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("minimum 3 and maximum 50 characters are required"),


    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be a string").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("minimum  6 characters are required"),

    
    body("role")
        .optional()
        .isIn(["user" , "seller"]).withMessage("invalid role"),
    


    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request",
                error: errors.array()
            })
        }

        next()
    }
]

export const loginValidator = [
    body("email")
        .exists().withMessage("email is required").bail()
        .isString().withMessage("email must be a string").bail()
        .trim().isLength({min:1}).withMessage("email is required").bail()
        .isEmail().withMessage("invalid email entered"),


    body("password")
        .exists().withMessage("password is required").bail()
        .isString().withMessage("password must be a string").bail()
        .trim().isLength({min:6}).withMessage("minimum 6 characters are required"),

    (req, res, next) =>{

        const error = validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json({
                message:"invalid request"
            })
        }

        next()
    }
]