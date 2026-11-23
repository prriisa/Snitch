import express from "express"
import router from "../router/product.router.js"
import cookieParser from "cookie-parser"
import authRouter from "../router/auth.router.js"
import cartRoute from "../router/cart.routes.js"
import cors from "cors"
import wishlistRoutes from "../router/wishlist.routes.js"
import orderRouter from "../router/order.router.js"

const app = express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use("/api/auth", authRouter)

app.use("/api/product", router)

app.use("/api/cart", cartRoute)

app.use("/api/wishlist", wishlistRoutes)

app.use("/api/order", orderRouter)

app.use((error, req, res, next) => {
    if (res.headersSent) return next(error)

    if (error.name === "MulterError") {
        const message = error.code === "LIMIT_FILE_SIZE"
            ? "Each uploaded image must be no larger than 1 MB"
            : error.code === "LIMIT_FILE_COUNT"
                ? "A product can have at most 5 images"
                : "Invalid image upload"
        return res.status(400).json({ message })
    }

    if (error.status >= 400 && error.status < 500) {
        return res.status(error.status).json({ message: error.message })
    }

    console.error("Unhandled API error:", error)
    return res.status(500).json({ message: "Internal server error" })
})

export default app