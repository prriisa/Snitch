import { Router } from "express"
import authenticate from "../middleware/auth.middleware.js"
import { cancelOrderController, createOrderController, fetchMyOrdersController, fetchSellerNotificationsController, fetchSellerOrderDetailController, fetchSellerProductSalesController, markSellerNotificationReadController } from "../controller/order.controller.js"

const orderRouter = Router()
const requireSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Seller access is required." })
    }
    next()
}

orderRouter.post("/", authenticate, createOrderController)
orderRouter.get("/", authenticate, fetchMyOrdersController)
orderRouter.get("/seller/notifications", authenticate, requireSeller, fetchSellerNotificationsController)
orderRouter.get("/seller/orders/:orderId", authenticate, requireSeller, fetchSellerOrderDetailController)
orderRouter.patch("/seller/notifications/:notificationId/read", authenticate, requireSeller, markSellerNotificationReadController)
orderRouter.patch("/:orderId/cancel", authenticate, cancelOrderController)
orderRouter.get(
    "/seller/products/:productId/sales",
    authenticate,
    requireSeller,
    fetchSellerProductSalesController
)

export default orderRouter
