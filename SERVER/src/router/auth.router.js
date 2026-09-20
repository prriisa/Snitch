import express, { Router } from "express"
import { loginUserController, refreshTokenController, registerUserController, getMe } from "../controller/auth.controller.js"
import { loginValidator, registerValidator } from "../validator/validator.js"

let router = Router()

router.post("/register", registerValidator, registerUserController)

router.post("/login",loginValidator, loginUserController)

router.get("/refresh" , refreshTokenController)

router.post("/me" , getMe)

export default router