import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js";
import { addToCartController } from "../controller/cart.controller.js";
import { addToCartValidator } from "../validator/cart.validator.js";

const cartRoute = Router()

cartRoute.post("/add", authenticate, addToCartValidator, addToCartController)

export default cartRoute