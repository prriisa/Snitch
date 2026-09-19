import RegisterModel from "../model/auth.model.js"
import bcrypt from "bcryptjs"

export const registerUserController = async (req, res) => {
    try {
        let { name, email, password } = req.body

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        let isRegistered = await RegisterModel.findOne({ email })
        if (isRegistered) {
            return res.status(400).json({
                message: "user already registered!"
            })
        }

        let userData = await RegisterModel.create({
            name,
            email,
            passwordHash: await bcrypt.hash(password, 10)
        })

        res.status(201).json({
            message: "user registered successfully",
            data: {
                userData: {
                    name: userData.name,
                    email: userData.email
                }
            }
        })

    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}