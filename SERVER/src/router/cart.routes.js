import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { addToCartController, fetchAllCartItemsController, updateCartValidator } from "../controller/cart.controller.js";
import { addToCartValidator } from "../validator/cart.validator.js";

const cartRoute = Router()

cartRoute.post("/add", authenticate, addToCartValidator, addToCartController)

cartRoute.get("/", authenticate, fetchAllCartItemsController)

cartRoute.post("/:id/update", authenticate, addToCartValidator,
    (req, res, next) => {
        const {id} = req.params
        
    },
    updateCartValidator)



export default cartRoute