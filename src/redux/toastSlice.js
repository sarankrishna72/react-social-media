import { createSlice } from '@reduxjs/toolkit'
const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toasts: [],
        configuration: {}
    },
    reducers: {
        addToast: (state, action) => {
            state.toasts.push(action.payload.toast)
            state.configuration = action.payload.configuration;
        },
        deleteToast: (state, action) => {
            state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
        }
    }
})

export const { addToast, deleteToast } = toastSlice.actions;
export default toastSlice.reducer;