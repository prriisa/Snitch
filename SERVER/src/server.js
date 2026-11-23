import app from "./app/app.js"
import config from "./config/config.js"
import connectDb from "./config/db.js"

import dns from "dns"
dns.setServers(["8.8.8.8", "1.1.1.1"])

await connectDb()

const port = config.port || 4000

app.listen(port, () => {
    console.log("server is running at  port", port)
})