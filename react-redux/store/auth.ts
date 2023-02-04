import { createSlice } from '@reduxjs/toolkit'

export type User = {
  name: string,
  phone: number
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: {} as User | null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  }
})

export const { login, logout } = counterSlice.actions

export default counterSlice.reducer