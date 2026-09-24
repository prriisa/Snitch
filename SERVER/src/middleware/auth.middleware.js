import { readAccessToken } from "../utils/auth.utils"

const authenticate = (req, res, next) => {
    let accessToken = req.header.authorization

    if (!accessToken) {
        return res.status(400).json({
            message: "access token not found"
        })
    }

    try {

        let decoded = readAccessToken(accessToken)

        res.user = decoded

        next()

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })

    }


}

export default authenticate