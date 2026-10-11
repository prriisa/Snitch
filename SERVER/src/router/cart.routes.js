import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { addToCartController, fetchAllCartItemsController, updateCartValidator, deleteCartItemController, manageQuantityController } from "../controller/cart.controller.js";
import { actionValidator, addToCartValidator } from "../validator/cart.validator.js";
import { cartItemIdValidator } from "../middleware/cart.middleware.js";

const cartRoute = Router()

cartRoute.post("/add", authenticate, addToCartValidator, addToCartController)

cartRoute.patch("/quantity/:cartItemId", authenticate, actionValidator, cartItemIdValidator, manageQuantityController)


cartRoute.get("/", authenticate, fetchAllCartItemsController)

cartRoute.post("/:id/update", authenticate, addToCartValidator,
    (req, res, next) => {
        const { id } = req.params

    },
    updateCartValidator)



export default cartRoute