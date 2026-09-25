import { readAccessToken } from "../utils/auth.utils.js"

const authenticate = (req, res, next) => {

    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(400).json({
            message: "access token not found"
        })
    }

    try {

        let decoded = readAccessToken(accessToken)

        req.user = decoded

        next()

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })

    }


}

export default authenticate