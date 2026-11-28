import express, { Router } from "express"
import {
    createSavedAddressController,
    deleteSavedAddressController,
    fetchSavedAddressesController,
    loginUserController,
    refreshTokenController,
    registerUserController,
    getMe,
    logOutController,
    setDefaultSavedAddressController,
    updateMyProfileController,
    updateSavedAddressController
} from "../controller/auth.controller.js"
import { loginValidator, registerValidator } from "../validator/auth.validator.js"
import authenticate from "../middleware/auth.middleware.js"
import allowedOrigins from "../config/allowedOrigins.js"

let authRouter = Router()

authRouter.post("/register", registerValidator, registerUserController)

authRouter.post("/login", loginValidator, loginUserController)

authRouter.post("/refresh", (req, res, next) => {
    const origin = req.get("origin")
    if (origin && !allowedOrigins.includes(origin)) {
        return res.status(403).json({ message: "Refresh requests must come from the trusted app origin." })
    }
    next()
}, refreshTokenController)

authRouter.post("/me", authenticate, getMe)
authRouter.patch("/me", authenticate, updateMyProfileController)
authRouter.get("/addresses", authenticate, fetchSavedAddressesController)
authRouter.post("/addresses", authenticate, createSavedAddressController)
authRouter.patch("/addresses/:addressId", authenticate, updateSavedAddressController)
authRouter.patch("/addresses/:addressId/default", authenticate, setDefaultSavedAddressController)
authRouter.delete("/addresses/:addressId", authenticate, deleteSavedAddressController)

authRouter.post("/logOut", authenticate, logOutController )

export default authRouter