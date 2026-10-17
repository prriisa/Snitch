import { configureStore } from "@reduxjs/toolkit"
import toastReducer from "./Slice/toastSlice"
import authreducer from "./Slice/authSlice"
import singleProductReducer from "./Slice/singleProductSlice"


export const store = configureStore({
    reducer:{
        toast: toastReducer,
        auth : authreducer,
        singleProduct : singleProductReducer
    }
})
