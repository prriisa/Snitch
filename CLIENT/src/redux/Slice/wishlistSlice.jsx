import { createSlice } from "@reduxjs/toolkit"

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: [] },
  reducers: {
    setWishlist: (state, action) => { state.ids = action.payload.map(String) },
    addWishlistId: (state, action) => {
      if (!state.ids.includes(String(action.payload))) state.ids.push(String(action.payload))
    },
    removeWishlistId: (state, action) => {
      state.ids = state.ids.filter((id) => id !== String(action.payload))
    }
  }
})

export const { setWishlist, addWishlistId, removeWishlistId } = wishlistSlice.actions
export default wishlistSlice.reducer