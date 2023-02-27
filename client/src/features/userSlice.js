import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        isAuthenticated: true,
        name:'John',
        surname:'Doe',
        email:'JohnDoe@gmail.com',
        accessToken: '',
        refreshToken: '',
        password: 'somehash12345'
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        change: (state, action) => {
            state.user = action.payload
        }
    }
})
  
  // Action creators are generated for each case reducer function
  export const {change} = userSlice.actions
  
  export default userSlice.reducer