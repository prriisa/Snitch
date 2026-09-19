import mongoose from "mongoose";

const RegisterSchema = mongoose.Schema({
    name: {
        required: [true, "name field is required"],
        type: [String, "invalid data type! only string format is allowed"],
        minLength: [3, "minimum 3 characters are required"]
    },
    email: {
        required: [true, "email field is required"],
        type: [String, "invalid data type! only string format is allowed"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email format"],
        unique:[true, "email must be unique"]
    },
    passwordHash:{
        required: [true, "password field is required"],
        type:String
    },
    rule:{
        type:String,
        default:"user",
        enum:["user" , "admin"]
    }
})

const RegisterModel = mongoose.model("registeredUsers" , RegisterSchema)

export default RegisterModel