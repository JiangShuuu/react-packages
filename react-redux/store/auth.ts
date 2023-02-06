import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export type User = {
  name: string,
  email: string
}
export interface CounterState {
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  user: null,
  status: 'idle',
};

export const loginAsync = createAsyncThunk('auth/fetchUser', async(num: number) => {
  console.log(num)

  const { data } = await axios.post('https://express.jiangshuuu.com/signin', {
    email: 'user2@example.com',
    password: '12345678'
  });

  const user = {
    name: data.data.user.userData.name,
    email: data.data.user.userData.email
  }

  return user
})

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state)=> {
        state.status = 'loading'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { login, logout } = counterSlice.actions

export default counterSlice.reducer