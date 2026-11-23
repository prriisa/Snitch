import axiosInstance from "./axiosInstance"

export const updateMyProfile = (data) => axiosInstance.patch("/auth/me", data)

export const fetchSavedAddresses = () => axiosInstance.get("/auth/addresses")

export const createSavedAddress = (data) => axiosInstance.post("/auth/addresses", data)

export const updateSavedAddress = (addressId, data) =>
    axiosInstance.patch(`/auth/addresses/${addressId}`, data)

export const setDefaultSavedAddress = (addressId) =>
    axiosInstance.patch(`/auth/addresses/${addressId}/default`)

export const deleteSavedAddress = (addressId) =>
    axiosInstance.delete(`/auth/addresses/${addressId}`)
