import RegisterModel from "../model/auth.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken, readRefreshToken } from "../utils/auth.utils.js"

export const registerUserController = async (req, res) => {
    try {
        let { name, email, password, role } = req.body

        let isRegistered = await RegisterModel.findOne({ email })
        if (isRegistered) {
            return res.status(400).json({
                message: "user already registered!"
            })
        }

        let userData = await RegisterModel.create({
            name,
            email,
            role,
            passwordHash: await bcrypt.hash(password, 10)
        })

        const accessToken = createAccessToken(userData._id, userData.role)
        const refreshToken = createRefreshToken(userData._id, userData.role)

        await RegisterModel.findByIdAndUpdate(userData._id, { refreshToken })

        res.cookie("refreshToken", refreshToken, { httpOnly: true })

        res.status(201).json({
            message: "user registered successfully",
            data: {
                userData: {
                    name: userData.name,
                    email: userData.email
                },
                accessToken,
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const loginUserController = async (req, res) => {

    try {

        let { email, password } = req.body

        const isRegistered = await RegisterModel.findOne({ email })

        if (!isRegistered) {
            return res.status(400).json({
                message: "Incorrect email or password"
            })
        }

        const isValidPassword = await bcrypt.compare(password, isRegistered.passwordHash)

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Incorrect email or password"
            })
        }

        const accessToken = createAccessToken(isRegistered._id, isRegistered.role)
        const refreshToken = createRefreshToken(isRegistered._id, isRegistered.role)

        await RegisterModel.findByIdAndUpdate(isRegistered._id, { refreshToken })

        res.cookie("refreshToken", refreshToken, { httpOnly: true })

        res.status(200).json({
            message: "user logged in successfully",
            data: {
                userData: {
                    name: isRegistered.name,
                    email: isRegistered.email
                },
                accessToken
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }

}

export const refreshTokenController = async (req, res) => {

    try {
        let { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(400).json({
                message: "Refresh Token not found"
            })
        }

        const decodedData = readRefreshToken(refreshToken)

        const userData = await RegisterModel.findById(decodedData.id)

        if (userData.refreshToken !== refreshToken) {
            await RegisterModel.findByIdAndUpdate(userData._id, { refreshToken: null })

            return res.status(400).json({
                message: "incorrect Refresh Token"
            })
        }

        const accessToken = createAccessToken(userData._id, userData.role)
        const newRefreshToken = createRefreshToken(userData._id, userData.role)

        await RegisterModel.findByIdAndUpdate(userData._id, { refreshToken: newRefreshToken })

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true })

        res.status(200).json({
            message: "new Token Generated Successfully",
            data: {
                userData: {
                    name: userData.name,
                    email: userData.email
                },
                accessToken
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }

}

export const getMe = async (req, res) => {

    try {
        let { userId } = req.user

        if (!userId) {
            return res.status(400).json({
                message: "user Id not Found"
            })
        }

        let userData = await RegisterModel.findById(userId)

        if(!userData){
            return res.status(400).json({
                message:"user not found"
            })
        }

        res.status(200).json({
            message: "user data fetched successfully",
            data: {
                userData: {
                    id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
                }
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error"
        })
    }
}