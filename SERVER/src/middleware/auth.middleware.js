
import { readAccessToken } from "../utils/auth.utils.js"

const authenticate = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Access token not found"
        })
    }

    try {
        const decoded = readAccessToken(accessToken)

        req.user = decoded

        next()
    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Access token expired or invalid"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default authenticate
