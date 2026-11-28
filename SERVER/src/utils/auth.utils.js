import jwt from "jsonwebtoken"
import config from "../config/config.js"
import { createHash, randomUUID } from "node:crypto"

export const createAccessToken = (id , role) => {
    const accessToken = jwt.sign({id , role}, config.accessTokenJwt, {expiresIn:"15m"})

    return accessToken
}

export const readAccessToken = (accessToken) => {
    return jwt.verify(accessToken , config.accessTokenJwt)
}

export const createRefreshToken = (id, role) => {
    const refreshToken = jwt.sign({ id, role, jti: randomUUID() }, config.refreshTokenJwt, { expiresIn: "7d" })

    return refreshToken
}

export const readRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.refreshTokenJwt)
}

export const hashRefreshToken = (refreshToken) =>
    createHash("sha256").update(refreshToken).digest("hex")