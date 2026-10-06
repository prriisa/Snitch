import axiosInstance from "./axiosInstance";

export const loginUser = (data) => axiosInstance.post("/auth/login", data)

export const registerUser = (data) => axiosInstance.post("/auth/register", data)

export const refreshTokens = () => axiosInstance.get("/auth/refresh")

export const getMe = () => axiosInstance.post("/auth/me")