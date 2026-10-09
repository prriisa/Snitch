import { ImageKit, toFile } from "@imagekit/nodejs"
import config from "../config/config.js"

const client = new ImageKit({
    privateKey: config.imagekitPrivateKey
})


const uploadFiles = async (buffer, fileName) => {

    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName:fileName,
        folder:"snitch"
    })

    return response
}

export const DeleteFiles = async(fileId) => {
    await client.files.delete(fileId)
}

export default uploadFiles