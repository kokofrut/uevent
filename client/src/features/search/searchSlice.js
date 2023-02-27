import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: localStorage.getItem("location") || "Kyiv",
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        }
    }
})
  
  // Action creators are generated for each case reducer function
  export const {change} = searchSlice.actions
  
  export default searchSlice.reducer