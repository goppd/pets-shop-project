import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      const item = action.payload
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        existing.count += item.count ?? 1
      } else {
        state.items.push({
          ...item,
          count: item.count ?? 1,
        })
      }
    },

    increase(state, action) {
      const id = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) item.count += 1
    },

    decrease(state, action) {
      const id = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item && item.count > 1) item.count -= 1
    },

    remove(state, action) {
      const id = action.payload
      state.items = state.items.filter((i) => i.id !== id)
    },

    clear(state) {
      state.items = []
    },
  },
})

export const { add, increase, decrease, remove, clear } = cartSlice.actions

export default cartSlice.reducer
