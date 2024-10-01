'use client'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import resultReducer from './results/resultsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        theme : themeReducer,
        results : resultReducer
    },
  })
}