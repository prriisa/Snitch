import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
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

    totalAmount: {
        type: Number,
        required: true,
        min: 0
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
        enum: ["PLACED", "CANCELLED", "RETURNED"],
        default: "PLACED"
    },

    deliveredAt: {
        type: Date,
        default: null
    },
}, { timestamps: true })

const orderModel = mongoose.model(orderSchema)

export default orderModel