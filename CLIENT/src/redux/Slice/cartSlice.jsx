
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  isLoading: false,
  error: null
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
    },

    setTotalPrice(state, action) {
      state.totalPrice = action.payload
    },

    setCartLoading(state, action) {
      state.isLoading = action.payload
    },

    setCartError(state, action) {
      state.error = action.payload
    },

    clearCart(state) {
      state.items = []
      state.totalPrice = 0
      state.totalQuantity = 0
      state.isLoading = false
      state.error = null
    }
  }
})

export const { setCart, setTotalPrice, setCartLoading, setCartError, clearCart } = cartSlice.actions

export default cartSlice.reducer
