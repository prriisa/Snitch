import axiosInstance from "./axiosInstance.jsx"

export const fetchCart = () => axiosInstance.get("/cart")

export const fetchCartTotal = () => axiosInstance.get("/cart/total")

export const addToCart = (productId, size, quantity = 1) =>
    axiosInstance.post("/cart/add", { productId, size, quantity })

export const updateCartQuantity = (cartItemId, action) =>
    axiosInstance.patch(`/cart/quantity/${cartItemId}/update`, { action })

export const updateCartSize = (cartItemId, size) =>
    axiosInstance.patch(`/cart/size/${cartItemId}/update`, { size })

export const removeCartItem = (cartItemId) =>
    axiosInstance.delete(`/cart/${cartItemId}/delete`)
