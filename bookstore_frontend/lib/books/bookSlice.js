'use client'
const { createSlice } = require("@reduxjs/toolkit");

const bookSlice = createSlice({
    name : 'books',
    initialState : [],
    reducers : {
        updateBooks : (state, action) => {
            console.log(action.payload)
            return action.payload
        }
    }
})

export const { updateBooks } = bookSlice.actions

export default bookSlice.reducer;