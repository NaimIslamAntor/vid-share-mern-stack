import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import videoServices from './videoServices'


//signin thunk
export const randomVideos = createAsyncThunk('video/random', async (thunkApi) => {
  try {
     return await videoServices.getVideos()
  } catch (error) {
     
      return thunkApi.rejectWithValue(error.response.data)
  }
})


const initialState = {
    videos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    errors: [],
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(randomVideos.pending, (state) => {
        state.isLoading = true
    })
    .addCase(randomVideos.fulfilled, (state, action) => { 
        state.videos = action.payload
        state.isLoading = false
        state.isSuccess = true
    })
    .addCase(randomVideos.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errors = action.payload
    })
  }
})



export const {} = videoSlice.actions

export default videoSlice.reducer