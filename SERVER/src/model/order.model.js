import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registeredUsers",
        required: true
    },

    product: [
        {
            product: {
                required: true,
                type: mongoose.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                required: true,
                type: Number,
                max: 10
            },
            size: {
                required: true,
                type: String,
                enum: ["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
            }
        }
    ],

    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        }
    },

    subtotalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    platformFee: {
        type: Number,
        required: true,
        min: 0
    },
    deliveryFee: {
        type: Number,
        required: true,
        min: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        enum: ["INR", "USD"],
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
        default: "PENDING"
    },

    orderStatus: {
        type: String,
        enum: ["PLACED", "CONFIRMED", "CANCELLED", "RETURNED"],
        default: "CONFIRMED"
    },

    deliveredAt: {
        type: Date,
        default: null
    },
}, { timestamps: true })

const orderModel = mongoose.model("orders", orderSchema)

export default orderModel