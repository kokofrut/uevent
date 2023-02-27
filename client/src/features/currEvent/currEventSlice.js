import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currEvent: {
        comments: [],
        id: 0,
        title: 'initial',
        content: 'initial content',
        author: 'initial author',
        city: 'Donetsk',
        price: 0,
        date: new Date()
    }
}

export const currEventSlice = createSlice({
    name: 'currEvent',
    initialState,
    reducers: {
        change: (state, action) => {
            state.currEvent = action.payload
        }
    }
})
  
  // Action creators are generated for each case reducer function
  export const {change} = currEventSlice.actions
  
  export default currEventSlice.reducer