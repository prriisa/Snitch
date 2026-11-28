import mongoose from "mongoose"

export const productCategories = [
    "Shirt", "Top", "T-Shirt", "Jean",
    "Trouser", "Footwear", "Cargo pant", "Jogger", "Short", "Overshirt",
    "Luggage", "Perfume", "Accessory", "Bag", "Belt", "Dress", "Sunglass", "Sweater", "Jacket", "Other"
]

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
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "unisex"],
        default: "unisex"
    },
    category: {
        type: String,
        required: true,
        enum: [...productCategories],
        default: "Other"
    },
    idempotencyKey: {
        type: String,
        select: false
    },
    images: {
        type: [{
            url: {
                type: String,
                required: true
            },
            fileId: {
                required: true,
                type: String
            }
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
}, { timestamps: true })

productSchema.index(
    { seller: 1, idempotencyKey: 1 },
    { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } } }
)

const productModel = mongoose.model("products", productSchema)

export default productModel