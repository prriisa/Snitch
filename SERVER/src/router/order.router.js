import { Router } from "express"
import authenticate from "../middleware/auth.middleware.js"
import { cancelOrderController, createOrderController, fetchMyOrdersController, fetchSellerProductSalesController } from "../controller/order.controller.js"

const orderRouter = Router()

orderRouter.post("/", authenticate, createOrderController)
orderRouter.get("/", authenticate, fetchMyOrdersController)
orderRouter.patch("/:orderId/cancel", authenticate, cancelOrderController)
orderRouter.get(
    "/seller/products/:productId/sales",
    authenticate,
    (req, res, next) => {
        if (req.user.role !== "seller") {
            return res.status(403).json({ message: "Seller access is required." })
        }
        next()
    },
    fetchSellerProductSalesController
)

export default orderRouter
