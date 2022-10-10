import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authServices'


//get the user from local storage
const user = JSON.parse(localStorage.getItem('auth'))


//signin thunk
export const signIn = createAsyncThunk('auth/signIn', async (creds, thunkApi) => {
    try {
       return await authService.userSignIn(creds)
    } catch (error) {
       
        return thunkApi.rejectWithValue(error.response.data)
    }
})


const initialState = {
    user: user,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errors: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
        state.isError = false
        state.isSuccess = false
        state.isLoading = false
        state.errors = []
    }
  },

  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
        state.isLoading = true
    })
    .addCase(signIn.fulfilled, (state, action) => { 
        
        // console.log(action.payload);

        state.user = action.payload
        state.isLoading = false
        state.isSuccess = true
    })
    .addCase(signIn.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errors = action.payload
      state.user = null
    })
}

});

export const { reset } = authSlice.actions

export default authSlice.reducer