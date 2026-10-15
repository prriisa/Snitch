import mongoose from "mongoose"

const wishlistSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "products",
            required: true
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "registeredUsers"
    }
}, { timestamps: true })

const wishlistModel = mongoose.model("wishlist", wishlistSchema)

export default wishlistModel