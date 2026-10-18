import axiosInstance from "./axiosInstance.jsx"

export const fetchWishlist = () => axiosInstance.get("/wishlist")
export const addWishlistItem = (id) => axiosInstance.post(`/wishlist/${id}/add`)
export const removeWishlistItem = (id) => axiosInstance.delete(`/wishlist/${id}/delete`)
export const checkWishlistItem = (id) => axiosInstance.get(`/wishlist/${id}/check`)