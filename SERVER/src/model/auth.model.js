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
    refreshToken: {
        type: String,
        default: null
    }
})

const RegisterModel = mongoose.model("registeredUsers", RegisterSchema)

export default RegisterModel