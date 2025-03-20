import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface User{
    name:string;
    email:string;
}

interface userState {
    user: User | null,
    isAuthenticated: boolean;
    role: ("user" | "admin" | "guest") | null 

}

const initialState:userState  = {
    user:null,
    isAuthenticated:false,
    role:null
}

export const userSlice =  createSlice({
    name:"user",
    initialState,
    reducers:{
        login: (state, action: PayloadAction<{ user: User; role: "user" | "admin" | "guest" }>) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
          },
          logout: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
          },
    }
})
export const {login,logout} = userSlice.actions;
export default userSlice.reducer;