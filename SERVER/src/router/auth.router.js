import express, { Router } from "express"
import { loginUserController, refreshTokenController, registerUserController, getMe } from "../controller/auth.controller.js"
import { loginValidator, registerValidator } from "../validator/auth.validator.js"
import authenticate from "../middleware/auth.middleware.js"

let authRouter = Router()

authRouter.post("/register", registerValidator, registerUserController)

authRouter.post("/login", loginValidator, loginUserController)

authRouter.get("/refresh", refreshTokenController)

authRouter.post("/me", authenticate, getMe)

export default authRouter