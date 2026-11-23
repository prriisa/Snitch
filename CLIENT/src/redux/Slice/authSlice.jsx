import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        isLoading: true,
        accessToken: null,
        user: null
    },
    reducers: {
        authenticate: (state, action) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.accessToken = action.payload.accessToken
            state.user = action.payload.user
        },
        unAuthorize: (state) => {
            state.isAuthenticated = false
            state.isLoading = false
            state.accessToken = null
            state.user = null
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        authChecked: (state) => {
            state.isLoading = false
        }
    }
})

export const { authenticate, unAuthorize, updateAccessToken, updateUser, authChecked } = authSlice.actions
export default authSlice.reducer