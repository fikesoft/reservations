import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";
import eventReducer from "./slices/eventSlice";
import filterReducer from "./slices/filterSlice"
import ticketReducer from "./slices/ticketSlice"
export const store = configureStore({
    reducer:{
        user:userReducer,
        toast:toastReducer,
        event:eventReducer,
        filter:filterReducer,
        ticket:ticketReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;