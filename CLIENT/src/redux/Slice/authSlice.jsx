import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        accessToken: null,
        user:null
    },
    reducers: {
        authenticate: (state, action) => {
            state.isAuthenticated = true
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        },
        unAuthorize: (state) => {
            state.isAuthenticated = false
            state.accessToken = null
            state.user = null
        }
    }
})

export const {authenticate, unAuthorize} = authSlice.actions
export default authSlice.reducer