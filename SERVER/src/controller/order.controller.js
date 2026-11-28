import mongoose from "mongoose"
import cartModel from "../model/cart.model.js"
import orderModel from "../model/order.model.js"
import sellerNotificationModel from "../model/sellerNotification.model.js"
import productModel from "../model/product.model.js"

const requiredAddressFields = ["fullName", "phone", "address", "city", "state", "pincode"]
const allowedSizes = ["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const platformFeeInRupees = 5
const deliveryFeeInRupees = 99
const freeDeliveryThresholdInRupees = 999

export const createOrderController = async (req, res) => {
    const { products, shippingAddress, paymentMethod, buyNow } = req.body || {}

    if (!Array.isArray(products) || !products.length) {
        return res.status(400).json({ message: "Add at least one product to the order." })
    }

    if (!shippingAddress || requiredAddressFields.some((field) => typeof shippingAddress[field] !== "string" || !shippingAddress[field].trim())) {
        return res.status(400).json({ message: "Complete all shipping address fields." })
    }

    if (paymentMethod !== "COD") {
        return res.status(400).json({ message: "Cash on delivery is the only available payment method." })
    }

    const quantitiesByVariant = new Map()
    for (const item of products) {
        if (
            !item ||
            !mongoose.Types.ObjectId.isValid(item.product) ||
            !allowedSizes.includes(item.size) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1 ||
            item.quantity > 10
        ) {
            return res.status(400).json({ message: "One or more order items are invalid." })
        }

        const key = `${item.product}:${item.size}`
        const existing = quantitiesByVariant.get(key)
        quantitiesByVariant.set(key, {
            product: item.product,
            size: item.size,
            quantity: (existing?.quantity || 0) + item.quantity
        })
    }

    const orderItems = Array.from(quantitiesByVariant.values())
    if (orderItems.some((item) => item.quantity > 10)) {
        return res.status(400).json({ message: "Quantity for a product size cannot exceed 10." })
    }

    const stockChanges = []
    let subtotalAmount = 0
    let currency
    let order
    const sellerProducts = new Map()

    try {
        if (!buyNow) {
            const cart = await cartModel.findOne({ user: req.user.id })
            if (!cart) {
                const error = new Error("Your bag is empty.")
                error.status = 400
                throw error
            }

            for (const item of orderItems) {
                const cartItem = cart.products.find(
                    (entry) => entry.product.toString() === item.product && entry.size === item.size
                )
                if (!cartItem || item.quantity > cartItem.quantity) {
                    const error = new Error("Your bag changed. Refresh it and try again.")
                    error.status = 409
                    throw error
                }
            }
        }

        for (const item of orderItems) {
            const product = await productModel.findById(item.product)
            if (!product) {
                const error = new Error("A product in this order no longer exists.")
                error.status = 404
                throw error
            }

            const selectedSize = product.sizes.find((entry) => entry.size === item.size)
            if (!selectedSize) {
                const error = new Error(`Size ${item.size} is no longer available for ${product.title}.`)
                error.status = 400
                throw error
            }

            if (currency && currency !== product.price.currency) {
                const error = new Error("All products in an order must use the same currency.")
                error.status = 400
                throw error
            }
            currency = product.price.currency
            subtotalAmount += product.price.amount * item.quantity
            const sellerId = product.seller.toString()
            const sellerItems = sellerProducts.get(sellerId) || []
            sellerItems.push({
                product: product._id,
                title: product.title,
                imageUrl: product.images?.[0]?.url || "",
                size: item.size,
                quantity: item.quantity,
                unitPrice: product.price.amount,
                currency: product.price.currency
            })
            sellerProducts.set(sellerId, sellerItems)

            const result = await productModel.updateOne(
                {
                    _id: item.product,
                    sizes: { $elemMatch: { size: item.size, stock: { $gte: item.quantity } } }
                },
                { $inc: { "sizes.$.stock": -item.quantity } }
            )

            if (result.modifiedCount !== 1) {
                const error = new Error(`Not enough ${item.size} stock remains for ${product.title}.`)
                error.status = 409
                throw error
            }

            stockChanges.push(item)
        }

        const platformFee = currency === "INR" ? platformFeeInRupees : 0
        const deliveryFee = currency === "INR" && subtotalAmount < freeDeliveryThresholdInRupees
            ? deliveryFeeInRupees
            : 0

        order = await orderModel.create({
            user: req.user.id,
            product: orderItems.map(({ product, size, quantity }) => ({ product, size, quantity })),
            shippingAddress: Object.fromEntries(requiredAddressFields.map((field) => [field, shippingAddress[field].trim()])),
            paymentMethod,
            paymentStatus: "PENDING",
            orderStatus: "CONFIRMED",
            subtotalAmount,
            platformFee,
            deliveryFee,
            totalAmount: subtotalAmount + platformFee + deliveryFee,
            currency
        })

        try {
            await sellerNotificationModel.insertMany(
                Array.from(sellerProducts, ([seller, sellerOrderItems]) => ({
                    seller,
                    order: order._id,
                    customerName: shippingAddress.fullName.trim(),
                    products: sellerOrderItems
                }))
            )
        } catch (notificationError) {
            console.error("Could not notify sellers about a new order:", notificationError)
        }

    } catch (error) {
        for (const item of stockChanges) {
            try {
                await productModel.updateOne(
                    { _id: item.product, sizes: { $elemMatch: { size: item.size } } },
                    { $inc: { "sizes.$.stock": item.quantity } }
                )
            } catch (rollbackError) {
                console.error("Could not restore stock after failed order:", rollbackError)
            }
        }

        console.error("Order creation failed:", error)
        return res.status(error.status || 500).json({
            message: error.status ? error.message : "Could not place the order."
        })
    }

    if (!buyNow) try {
        await cartModel.updateOne(
            { user: req.user.id },
            { $pull: { products: { $or: orderItems.map(({ product, size }) => ({ product, size })) } } }
        )
    } catch (error) {
        console.error("Order placed, but the cart could not be cleared:", error)
    }

    return res.status(201).json({
        message: "Order placed successfully.",
        data: { order }
    })
}

export const cancelOrderController = async (req, res) => {
    const { orderId } = req.params
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order id." })
    }

    try {
        const existingOrder = await orderModel.findOne({
            _id: orderId,
            user: req.user.id
        }).select("orderStatus product")

        if (!existingOrder) {
            return res.status(404).json({ message: "Order not found." })
        }

        if (!["PLACED", "CONFIRMED"].includes(existingOrder.orderStatus)) {
            return res.status(409).json({ message: "This order can no longer be cancelled." })
        }

        const order = await orderModel.findOneAndUpdate(
            {
                _id: orderId,
                user: req.user.id,
                orderStatus: existingOrder.orderStatus
            },
            { $set: { orderStatus: "CANCELLED" } },
            { new: true }
        )

        if (!order) {
            return res.status(409).json({ message: "This order has already been updated." })
        }

        const restoredStock = []
        try {
            for (const item of order.product) {
                const result = await productModel.updateOne(
                    {
                        _id: item.product,
                        sizes: { $elemMatch: { size: item.size } }
                    },
                    { $inc: { "sizes.$.stock": item.quantity } }
                )

                if (result.modifiedCount === 1) restoredStock.push(item)
            }
        } catch (error) {
            for (const item of restoredStock) {
                try {
                    await productModel.updateOne(
                        {
                            _id: item.product,
                            sizes: { $elemMatch: { size: item.size, stock: { $gte: item.quantity } } }
                        },
                        { $inc: { "sizes.$.stock": -item.quantity } }
                    )
                } catch (rollbackError) {
                    console.error("Could not undo stock restoration after failed cancellation:", rollbackError)
                }
            }

            await orderModel.updateOne(
                { _id: orderId, user: req.user.id, orderStatus: "CANCELLED" },
                { $set: { orderStatus: existingOrder.orderStatus } }
            )
            throw error
        }

        return res.status(200).json({
            message: "Order cancelled successfully.",
            data: { order }
        })
    } catch (error) {
        console.error("Could not cancel customer order:", error)
        return res.status(500).json({ message: "Could not cancel this order." })
    }
}

export const fetchMyOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate("product.product", "title images price")

        return res.status(200).json({
            message: "Orders fetched successfully.",
            data: { orders }
        })
    } catch (error) {
        console.error("Could not fetch customer orders:", error)
        return res.status(500).json({ message: "Could not load your orders." })
    }
}

export const fetchSellerProductSalesController = async (req, res) => {
    try {
        const { productId } = req.params
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product id." })
        }

        const product = await productModel.findOne({ _id: productId, seller: req.user.id }).select("_id sizes")
        if (!product) {
            return res.status(404).json({ message: "Product not found in your seller account." })
        }

        const [sales = { totalSold: 0, bySize: [] }] = await orderModel.aggregate([
            { $match: { orderStatus: { $in: ["PLACED", "CONFIRMED"] } } },
            { $unwind: "$product" },
            { $match: { "product.product": product._id } },
            {
                $group: {
                    _id: "$product.size",
                    quantitySold: { $sum: "$product.quantity" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSold: { $sum: "$quantitySold" },
                    bySize: { $push: { size: "$_id", quantitySold: "$quantitySold" } }
                }
            },
            { $project: { _id: 0, totalSold: 1, bySize: 1 } }
        ])

        const soldBySize = new Map(sales.bySize.map((item) => [item.size, item.quantitySold]))
        const availableBySize = product.sizes.map(({ size, stock }) => ({
            size,
            stock,
            quantitySold: soldBySize.get(size) || 0
        }))

        return res.status(200).json({
            message: "Product sales fetched successfully.",
            data: {
                sales: {
                    totalSold: sales.totalSold,
                    totalAvailable: availableBySize.reduce((total, item) => total + item.stock, 0),
                    bySize: availableBySize
                }
            }
        })
    } catch (error) {
        console.error("Could not fetch seller product sales:", error)
        return res.status(500).json({ message: "Could not load product sales." })
    }
}

export const fetchSellerNotificationsController = async (req, res) => {
    try {
        const notifications = await sellerNotificationModel.find({ seller: req.user.id })
            .sort({ createdAt: -1 })
            .limit(30)
            .populate("order", "shippingAddress subtotalAmount platformFee deliveryFee totalAmount currency paymentMethod createdAt")
            .populate("products.product", "title images price")

        return res.status(200).json({
            message: "Seller notifications fetched successfully.",
            data: { notifications }
        })
    } catch (error) {
        console.error("Could not fetch seller notifications:", error)
        return res.status(500).json({ message: "Could not load seller notifications." })
    }
}

export const fetchSellerOrderDetailController = async (req, res) => {
    const { orderId } = req.params
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order id." })
    }

    try {
        const notification = await sellerNotificationModel.findOne({
            seller: req.user.id,
            order: orderId
        })
            .populate("order", "shippingAddress subtotalAmount platformFee deliveryFee totalAmount currency paymentMethod createdAt")
            .populate("products.product", "title images price")

        if (!notification || !notification.order) {
            return res.status(404).json({ message: "Order not found in your seller notifications." })
        }

        return res.status(200).json({
            message: "Seller order details fetched successfully.",
            data: { notification }
        })
    } catch (error) {
        console.error("Could not fetch seller order details:", error)
        return res.status(500).json({ message: "Could not load this order." })
    }
}

export const markSellerNotificationReadController = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.notificationId)) {
        return res.status(400).json({ message: "Invalid notification id." })
    }

    try {
        const notification = await sellerNotificationModel.findOneAndUpdate(
            { _id: req.params.notificationId, seller: req.user.id, readAt: null },
            { $set: { readAt: new Date() } },
            { new: true }
        )
        if (!notification) return res.status(404).json({ message: "Notification not found." })

        return res.status(200).json({
            message: "Notification marked as read.",
            data: { notification }
        })
    } catch (error) {
        console.error("Could not update seller notification:", error)
        return res.status(500).json({ message: "Could not update this notification." })
    }
}
