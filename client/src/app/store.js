import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';


//import reducers
import authReducer from '../features/auth/authSlice'
import videoReducer from '../features/video/videoSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
  },
});
