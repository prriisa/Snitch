import axiosInstance from "./axiosInstance";

export const fetchAllProducts = () => axiosInstance.get("/product")

export const createProduct = (data, idempotencyKey) => axiosInstance.post("/product/create", data, {
    headers: { "Idempotency-Key": idempotencyKey },
    timeout: 90000
})

export const fetchSingleProduct = (id) => axiosInstance.get(`/product/${id}`)

export const deleteProduct = (id) => axiosInstance.delete(`/product/${id}/delete`)

export const updateProduct = (id, data) => axiosInstance.patch(`/product/${id}/update`, data)