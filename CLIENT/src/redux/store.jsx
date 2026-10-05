import { configureStore } from "@reduxjs/toolkit"
import toastReducer from "./Slice/toastSlice"
import authreducer from "./Slice/authSlice"


export const store = configureStore({
    reducer:{
        toast: toastReducer,
        auth : authreducer
    }
})
