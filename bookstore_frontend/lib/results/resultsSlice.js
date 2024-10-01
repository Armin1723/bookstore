'use client'
const { createSlice } = require("@reduxjs/toolkit");

const resultSlice = createSlice({
    name : 'results',
    initialState : {
        books : [],
        hasMore : false
    },
    reducers : {
        updateResults : (state, action) => {
            state.books = action.payload.books;
            state.totalPages = action.payload.totalPages;
        }
    }
})

export const { updateResults } = resultSlice.actions

export default resultSlice.reducer;