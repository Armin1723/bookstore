'use client'
import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import bookReducer from './books/bookSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        theme : themeReducer,
        books : bookReducer
    },
  })
}