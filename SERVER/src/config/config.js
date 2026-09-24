import "dotenv/config"

const config = {
    port : process.env.PORT,
    mongoUri : process.env.MONGO_URI,
    accessTokenJwt : process.env.ACCESS_JWT,
    refreshTokenJwt : process.env.REFRESH_JWT,
    imagekitPrivateKey : process.env.IMAGEKIT_PRIVATE_KEY
}

export default config