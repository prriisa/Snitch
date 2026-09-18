import app from "./app/app.js"
import config from "./config/config.js"
import connectDb from "./config/db.js"
await connectDb()

const port = config.port || 4000

app.listen(port , () => {
    console.log("server is running at  port" , port)
})