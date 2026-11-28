import mongoose from "mongoose"

const sellerNotificationSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registeredUsers",
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: ""
        },
        size: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unitPrice: {
            type: Number
        },
        currency: {
            type: String,
            enum: ["INR", "USD"]
        }
    }],
    readAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

sellerNotificationSchema.index({ seller: 1, order: 1 }, { unique: true })

const sellerNotificationModel = mongoose.model("sellerNotifications", sellerNotificationSchema)

export default sellerNotificationModel
