import express, { Router } from "express"
import { loginUserController, refreshTokenController, registerUserController, getMe, logOutController } from "../controller/auth.controller.js"
import { loginValidator, registerValidator } from "../validator/auth.validator.js"
import authenticate from "../middleware/auth.middleware.js"

let authRouter = Router()

authRouter.post("/register", registerValidator, registerUserController)

authRouter.post("/login", loginValidator, loginUserController)

authRouter.get("/refresh", refreshTokenController)

authRouter.post("/me", authenticate, getMe)

authRouter.post("/logOut", authenticate, logOutController )

export default authRouter