import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
    name: "toast",
    initialState: {
        toast: null
    },

    reducers: {
        setToast: (state, action) => {
            state.toast = action.payload
        },
        hideToast: (state) => {
            state.toast = null
        }
    }

})

export const {setToast, hideToast} = toastSlice.actions

export default toastSlice.reducer