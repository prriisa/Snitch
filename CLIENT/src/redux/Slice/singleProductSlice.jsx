import { createSlice } from "@reduxjs/toolkit"

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: { product: null, loading: false, error: "" },
  reducers: {
    setSingleProduct: (state, action) => {
      state.product = action.payload
      state.loading = false
      state.error = ""
    },
    clearSingleProduct: (state) => {
      state.product = null
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

export const { setSingleProduct, clearSingleProduct, setProductLoading, setProductError } = singleProductSlice.actions
export default singleProductSlice.reducer