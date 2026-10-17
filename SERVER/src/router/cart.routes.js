import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { addToCartController, fetchAllCartItemsController, deleteCartItemController, manageQuantityController, manageSizeController, totalPriceController } from "../controller/cart.controller.js";
import { actionValidator, addToCartValidator, sizeValidator } from "../validator/cart.validator.js";
import { cartItemMiddleware } from "../middleware/cart.middleware.js";

const cartRoute = Router()

cartRoute.post("/add", authenticate, addToCartValidator, addToCartController)

cartRoute.patch("/quantity/:cartItemId/update", authenticate, actionValidator, cartItemMiddleware, manageQuantityController)

cartRoute.patch("/size/:cartItemId/update", authenticate, sizeValidator, cartItemMiddleware, manageSizeController)

cartRoute.delete("/:cartItemId/delete", authenticate, cartItemMiddleware, deleteCartItemController)

cartRoute.get("/", authenticate, fetchAllCartItemsController)

cartRoute.get("/total", authenticate, totalPriceController)

export default cartRoute