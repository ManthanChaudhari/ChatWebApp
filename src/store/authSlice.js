import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authorized : false,
    userData : null,
    room : "",
    joinedUsers : []
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state,action) => {
            state.userData = action.payload;
            state.authorized = true;
        },
        logout : (state) => {
            state.authorized = false;
            state.userData = null
        },
       sendCode : (state,action) => {
        state.room  =  action.payload;
       },
       addUser : (state , action) => {
        state.joinedUsers = [...state.joinedUsers , action.payload]
       }
     }
});

export const {login , logout,sendCode} = authSlice.actions;
export default authSlice.reducer;