import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
    name: {
        required: [true, "name field is required"],
        type: String,
        minLength: [3, "minimum 3 characters are required"]
    },
    email: {
        required: [true, "email field is required"],
        type: String,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email format"],
        unique: [true, "email must be unique"]
    },
    passwordHash: {
        required: [true, "password field is required"],
        type: String
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "seller"],
            message: "{values} is not a valid role"
        }
    },
    savedAddresses: [{
        label: {
            type: String,
            required: true,
            trim: true,
            maxLength: 30
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 100
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            maxLength: 20
        },
        address: {
            type: String,
            required: true,
            trim: true,
            maxLength: 200
        },
        city: {
            type: String,
            required: true,
            trim: true,
            maxLength: 80
        },
        state: {
            type: String,
            required: true,
            trim: true,
            maxLength: 80
        },
        pincode: {
            type: String,
            required: true,
            trim: true,
            maxLength: 12
        },
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    refreshToken: {
        type: String,
        default: null,
        select: false
    },
    refreshTokenHash: {
        type: String,
        default: null,
        select: false
    }
},{timestamps:true})

const RegisterModel = mongoose.model("registeredUsers", RegisterSchema)

export default RegisterModel