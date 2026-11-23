import { createSlice } from "@reduxjs/toolkit"

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: { product: null, loading: false, error: "", selectedSize: "" },
  reducers: {
    setSingleProduct: (state, action) => {
      state.product = action.payload
      state.loading = false
      state.error = ""
    },
    clearSingleProduct: (state) => {
      state.product = null
      state.selectedSize = ""
    },
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload
    },
    setProductLoading: (state) => {
      state.loading = true
      state.error = ""
    },
    setProductError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { setSingleProduct, clearSingleProduct, setSelectedSize, setProductLoading, setProductError } = singleProductSlice.actions
export default singleProductSlice.reducer