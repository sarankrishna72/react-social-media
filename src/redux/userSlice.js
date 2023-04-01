import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedInUser: {},
        onlineusers: []
    },
    reducers: {
        setLoggedInUser:  (state, action) => {
            const {name, profilePicture, phoneNumber, username, coverPicture, email, fName, lName, _id} = action.payload
            state.loggedInUser =  { name, profilePicture, phoneNumber, username, coverPicture, email , fName, lName, _id};
        },
        setOnlineusers: (state, action) => {
            state.onlineusers = action.payload;
        },

    
    }
})

export const { setLoggedInUser, setOnlineusers } = userSlice.actions;
export default userSlice.reducer;