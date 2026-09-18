import mongoose from "mongoose"
import config from "./config.js"

const connectDb = async() => {
    try {
        await mongoose.connect(config.mongoUri)
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb