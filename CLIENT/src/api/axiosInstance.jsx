import axios from "axios"
import { refreshTokens } from "./authApi"
import { store } from "../redux/store"
import { unAuthorize, updateAccessToken } from "../redux/Slice/authSlice"

const baseURL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "")
let refreshRequest

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 15000
})

axiosInstance.interceptors.request.use(

    (config) => {
        const accessToken = store.getState().auth.accessToken

        if (accessToken) {
            config.headers.authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true

            try {
                if (!refreshRequest) {
                    refreshRequest = refreshTokens().finally(() => {
                        refreshRequest = null
                    })
                }
                const response = await refreshRequest
                const newAccessToken = response.data.data.accessToken

                store.dispatch(updateAccessToken(newAccessToken))

                originalRequest.headers = originalRequest.headers || {}
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                return axiosInstance(originalRequest)
            } catch (refreshError) {
                store.dispatch(unAuthorize())
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance