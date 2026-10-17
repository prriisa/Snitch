import axios from "axios"
import { refreshTokens } from "./authApi"
import { store } from "../redux/store"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
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
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {
            originalRequest._retry = true

            try {
                const response = await refreshTokens()
                const newAccessToken = response.data.data.accessToken

                store.dispatch(updateAccessToken(newAccessToken))

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