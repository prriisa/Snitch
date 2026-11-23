import axiosInstance from "./axiosInstance"

export const createOrder = (data) => axiosInstance.post("/order", data)

export const fetchMyOrders = () => axiosInstance.get("/order")

export const cancelOrder = (orderId) => axiosInstance.patch(`/order/${orderId}/cancel`)

export const fetchSellerProductSales = (productId) =>
    axiosInstance.get(`/order/seller/products/${productId}/sales`)
