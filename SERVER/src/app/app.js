import express from "express"
import router from "../router/product.router.js"
import cookieParser from "cookie-parser"
import authRouter from "../router/auth.router.js"
import cartRoute from "../router/cart.routes.js"
import cors from "cors"



const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter)

app.use("/api/product", router)

app.use("/api/cart", cartRoute)

export default app