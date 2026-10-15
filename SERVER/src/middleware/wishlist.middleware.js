// import mongoose from "mongoose"

// export const wishlistMiddleware = async (req, res, next) => {
//     const { id } = req.params
//     const user = req.user

//     try {
//         if (!id) {
//             return res.status(404).json({
//                 message: "product Id not Found"
//             })

//         }

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 message: "Invalid product Id"
//             })
//         }

//         req.productId = id

//         next()


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: "Internal Server Error"
//         })

//     }

// }