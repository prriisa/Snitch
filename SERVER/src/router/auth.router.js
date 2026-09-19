import express, { Router } from "express"
import { registerUserController } from "../controller/auth.controller.js"

let router = Router()

router.post("/register" , registerUserController )

export default router