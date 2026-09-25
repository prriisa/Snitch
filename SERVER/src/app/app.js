import express from "express"
import router from "../router/product.router.js"
import cookieParser from "cookie-parser"
import authRouter from "../router/auth.router.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)

app.use("/api/product", router)

export default app