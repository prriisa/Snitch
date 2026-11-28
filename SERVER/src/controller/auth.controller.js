import RegisterModel from "../model/auth.model.js"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken, hashRefreshToken, readRefreshToken } from "../utils/auth.utils.js"

const addressFields = ["fullName", "phone", "address", "city", "state", "pincode"]
const addressFieldLimits = {
    fullName: 100,
    phone: 20,
    address: 200,
    city: 80,
    state: 80,
    pincode: 12
}

const validateSavedAddress = (input = {}) => {
    const address = {}
    for (const field of addressFields) {
        if (typeof input[field] !== "string" || !input[field].trim() || input[field].trim().length > addressFieldLimits[field]) {
            return { error: `Enter a valid ${field}.` }
        }
        address[field] = input[field].trim()
    }

    const label = typeof input.label === "string" && input.label.trim() ? input.label.trim() : "Home"
    if (label.length > 30) return { error: "Address label must be 30 characters or fewer." }

    return {
        address: {
            ...address,
            label,
            isDefault: input.isDefault === true
        }
    }
}

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth"
}

const clearRefreshCookies = (res) => {
    res.clearCookie("refreshToken", refreshCookieOptions)
    res.clearCookie("refreshToken", { ...refreshCookieOptions, path: "/" })
}

export const registerUserController = async (req, res) => {
    try {
        let { name, email, password, role = "user" } = req.body

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

        await RegisterModel.findByIdAndUpdate(userData._id, {
            $set: { refreshTokenHash: hashRefreshToken(refreshToken) },
            $unset: { refreshToken: 1 }
        })

        clearRefreshCookies(res)
        res.cookie("refreshToken", refreshToken, refreshCookieOptions)

        res.status(201).json({
            message: "user registered successfully",
            data: {
                userData: {
                    id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
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

        await RegisterModel.findByIdAndUpdate(isRegistered._id, {
            $set: { refreshTokenHash: hashRefreshToken(refreshToken) },
            $unset: { refreshToken: 1 }
        })

        clearRefreshCookies(res)
        res.cookie("refreshToken", refreshToken, refreshCookieOptions)

        res.status(200).json({
            message: "user logged in successfully",
            data: {
                userData: {
                    id: isRegistered._id,
                    name: isRegistered.name,
                    email: isRegistered.email,
                    role: isRegistered.role
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
        const refreshToken = req.cookies?.refreshToken

        if (!refreshToken) {
            clearRefreshCookies(res)
            return res.status(401).json({
                message: "Refresh Token not found"
            })
        }

        const decodedData = readRefreshToken(refreshToken)

        const userData = await RegisterModel.findById(decodedData.id).select("+refreshToken +refreshTokenHash")

        const tokenHash = hashRefreshToken(refreshToken)
        const matchesStoredToken = userData && (
            userData.refreshTokenHash === tokenHash ||
            (!userData.refreshTokenHash && userData.refreshToken === refreshToken)
        )

        if (!matchesStoredToken) {
            clearRefreshCookies(res)
            return res.status(401).json({
                message: "incorrect Refresh Token"
            })
        }

        const accessToken = createAccessToken(userData._id, userData.role)
        const newRefreshToken = createRefreshToken(userData._id, userData.role)

        const tokenFilter = userData.refreshTokenHash
            ? { _id: userData._id, refreshTokenHash: userData.refreshTokenHash }
            : { _id: userData._id, refreshToken }
        const rotation = await RegisterModel.updateOne(tokenFilter, {
            $set: { refreshTokenHash: hashRefreshToken(newRefreshToken) },
            $unset: { refreshToken: 1 }
        })
        if (rotation.modifiedCount !== 1) {
            clearRefreshCookies(res)
            return res.status(401).json({ message: "Refresh token has already been used." })
        }

        clearRefreshCookies(res)
        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions)

        res.status(200).json({
            message: "new Token Generated Successfully",
            data: {
                userData: {
                    id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    role: userData.role
                },
                accessToken
            }
        })

    } catch (error) {
        if (["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"].includes(error.name)) {
            clearRefreshCookies(res)
            return res.status(401).json({ message: "Refresh token expired or invalid" })
        }
        console.error(error)
        return res.status(500).json({ message: "internal server error" })
    }

}

export const getMe = async (req, res) => {

    try {
        let userId = req.user.id

        if (!userId) {
            return res.status(400).json({
                message: "user Id not Found"
            })
        }

        let userData = await RegisterModel.findById(userId)

        if (!userData) {
            return res.status(400).json({
                message: "user not found"
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

export const updateMyProfileController = async (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : ""
    if (name.length < 3 || name.length > 100) {
        return res.status(400).json({ message: "Name must be between 3 and 100 characters." })
    }

    try {
        const user = await RegisterModel.findByIdAndUpdate(
            req.user.id,
            { $set: { name } },
            { new: true, runValidators: true }
        ).select("_id name email role")

        if (!user) return res.status(404).json({ message: "User not found." })

        return res.status(200).json({
            message: "Personal information updated successfully.",
            data: {
                userData: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        })
    } catch (error) {
        console.error("Could not update personal information:", error)
        return res.status(500).json({ message: "Could not update personal information." })
    }
}

export const fetchSavedAddressesController = async (req, res) => {
    try {
        const user = await RegisterModel.findById(req.user.id).select("savedAddresses")
        if (!user) return res.status(404).json({ message: "User not found." })

        return res.status(200).json({
            message: "Saved addresses fetched successfully.",
            data: { addresses: user.savedAddresses }
        })
    } catch (error) {
        console.error("Could not fetch saved addresses:", error)
        return res.status(500).json({ message: "Could not load saved addresses." })
    }
}

export const createSavedAddressController = async (req, res) => {
    const { address, error } = validateSavedAddress(req.body)
    if (error) return res.status(400).json({ message: error })

    try {
        const user = await RegisterModel.findById(req.user.id).select("savedAddresses")
        if (!user) return res.status(404).json({ message: "User not found." })

        address.isDefault = address.isDefault || user.savedAddresses.length === 0
        if (address.isDefault) user.savedAddresses.forEach((savedAddress) => { savedAddress.isDefault = false })
        user.savedAddresses.push(address)
        await user.save()

        return res.status(201).json({
            message: "Address saved successfully.",
            data: { addresses: user.savedAddresses }
        })
    } catch (saveError) {
        console.error("Could not save address:", saveError)
        return res.status(500).json({ message: "Could not save this address." })
    }
}

export const updateSavedAddressController = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.addressId)) {
        return res.status(400).json({ message: "Invalid address id." })
    }

    const { address, error } = validateSavedAddress(req.body)
    if (error) return res.status(400).json({ message: error })

    try {
        const user = await RegisterModel.findById(req.user.id).select("savedAddresses")
        if (!user) return res.status(404).json({ message: "User not found." })

        const savedAddress = user.savedAddresses.id(req.params.addressId)
        if (!savedAddress) return res.status(404).json({ message: "Address not found." })

        const wasDefault = savedAddress.isDefault
        if (address.isDefault) user.savedAddresses.forEach((item) => { item.isDefault = false })
        Object.assign(savedAddress, address)
        if (wasDefault && !address.isDefault && user.savedAddresses.length > 1) {
            user.savedAddresses.find((item) => !item._id.equals(savedAddress._id)).isDefault = true
        }
        await user.save()

        return res.status(200).json({
            message: "Address updated successfully.",
            data: { addresses: user.savedAddresses }
        })
    } catch (saveError) {
        console.error("Could not update saved address:", saveError)
        return res.status(500).json({ message: "Could not update this address." })
    }
}

export const deleteSavedAddressController = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.addressId)) {
        return res.status(400).json({ message: "Invalid address id." })
    }

    try {
        const user = await RegisterModel.findById(req.user.id).select("savedAddresses")
        if (!user) return res.status(404).json({ message: "User not found." })

        const address = user.savedAddresses.id(req.params.addressId)
        if (!address) return res.status(404).json({ message: "Address not found." })
        const wasDefault = address.isDefault
        user.savedAddresses.pull(req.params.addressId)
        if (wasDefault && user.savedAddresses.length) user.savedAddresses[0].isDefault = true
        await user.save()

        return res.status(200).json({
            message: "Address deleted successfully.",
            data: { addresses: user.savedAddresses }
        })
    } catch (error) {
        console.error("Could not delete saved address:", error)
        return res.status(500).json({ message: "Could not delete this address." })
    }
}

export const setDefaultSavedAddressController = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.addressId)) {
        return res.status(400).json({ message: "Invalid address id." })
    }

    try {
        const user = await RegisterModel.findById(req.user.id).select("savedAddresses")
        if (!user) return res.status(404).json({ message: "User not found." })

        const address = user.savedAddresses.id(req.params.addressId)
        if (!address) return res.status(404).json({ message: "Address not found." })
        user.savedAddresses.forEach((item) => { item.isDefault = item._id.equals(address._id) })
        await user.save()

        return res.status(200).json({
            message: "Default address updated successfully.",
            data: { addresses: user.savedAddresses }
        })
    } catch (error) {
        console.error("Could not set the default address:", error)
        return res.status(500).json({ message: "Could not update the default address." })
    }
}

export const logOutController = async (req, res) => {
  try {
    const userData = req.user

    if (!userData?.id) {
      return res.status(400).json({
        message: "Invalid token payload"
      })
    }

    const dbUser = await RegisterModel.findById(userData.id)

    if (!dbUser) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    await RegisterModel.findByIdAndUpdate(dbUser._id, {
      $set: { refreshTokenHash: null },
      $unset: { refreshToken: 1 }
    })
    clearRefreshCookies(res)

    return res.status(200).json({
      message: "User logged out successfully"
    })
  } catch (error) {
    console.error("Logout error:", error)

    return res.status(500).json({
      message: "Internal server error"
    })
  }
}