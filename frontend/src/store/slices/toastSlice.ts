import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ToastPayload {
    type: "success" | "error" | "info" | "warning";
    message: string;
}

export const toastSlice = createSlice({
    name: "toast",
    initialState: {},
    reducers: {
        showToast: ( _ , action: { payload: ToastPayload }) => {
            const { type, message } = action.payload;
            toast[type](message); // Correct function call
        }
    }
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
