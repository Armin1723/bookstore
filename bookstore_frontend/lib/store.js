import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        theme : themeReducer
    }
  })
}