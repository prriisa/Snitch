import { Router } from "express";
import authenticate from "../middleware/auth.middleware.js"
import { addToWishlistController, fetchWishlistController, removeFromWishlistController } from "../controller/wishlist.controller.js";
import { wishlistValidator } from "../validator/wishlist.validator.js";

const wishlistRoutes = Router()

wishlistRoutes.get("/", authenticate, fetchWishlistController)

wishlistRoutes.post("/:id/add", authenticate, wishlistValidator, addToWishlistController)

wishlistRoutes.delete("/:id/delete", authenticate, wishlistValidator, removeFromWishlistController)

export default wishlistRoutes