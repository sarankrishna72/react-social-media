import { configureStore } from '@reduxjs/toolkit'
import chatSliceReducer from './chatSlice';
import toastSliceReducer from './toastSlice';
import userSliceReducer from './userSlice';

const store = configureStore({
    reducer: {
        toast: toastSliceReducer,
        user: userSliceReducer,
        chat: chatSliceReducer
    }
})

export default store;