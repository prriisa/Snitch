import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minLength: 3,
        maxLength: 100
    },
    description: {
        required: true,
        type: String,
        minLength: 3,
        maxLength: 500
    },
    images: {
        type: [{
            type: String
        }],
        validate: {
            validator: images => images.length <= 5,
            message: "a product can have at most 5 images"
        }
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            enum: ["INR", "USD"]
        }
    },
    sizes: [
        {
            size: {
                type: String,
                required: true,
                enum: ["Free Size", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
            },
            stock: {
                type: Number,
                required: true,
                default: 1,
                min: 0
            }
        }
    ],
    seller: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "RegisteredUsers"
    }
})

const productModel = mongoose.create("products", productSchema)

export default productModel