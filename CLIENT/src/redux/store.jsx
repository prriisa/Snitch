import { configureStore } from "@reduxjs/toolkit"
import toastReducer from "./Slice/toastSlice"
import authreducer from "./Slice/authSlice"
import singleProductReducer from "./Slice/singleProductSlice"
import wishlistReducer from "./Slice/wishlistSlice"
import cartSlice from "./Slice/cartSlice"


export const store = configureStore({
    reducer: {
        toast: toastReducer,
        auth: authreducer,
        singleProduct: singleProductReducer,
        wishlist: wishlistReducer,
        cart:cartSlice
    }
})
