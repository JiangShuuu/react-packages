import { configureStore } from '@reduxjs/toolkit'
import counter from './counter'
import auth from './auth'
export default configureStore({
  reducer: {
    counter,
    auth
  }
})