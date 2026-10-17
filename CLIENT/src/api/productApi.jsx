import axiosInstance from "./axiosInstance";

export const fetchAllProducts = () => axiosInstance.get("/product")

export const createProduct = (data) => axiosInstance.post("/product/create")

export const fetchSingleProduct = (id) => axiosInstance.get(`/product/${id}`)

export const deleteProduct = (id) => axiosInstance.delete(`/product/${id}/delete`)

export const updateProduct = (id, data) => axiosInstance.patch(`/product/${id}/update`, data)