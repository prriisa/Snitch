import mongoose, { Mongoose } from "mongoose"

const cartSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                default: 1,
                min: 1,
                type: Number
            },
            size: {
                required: true,
                type: String,
                enum: ["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
            }
        }
    ],
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "registeredUsers",
        required: true
    }
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel