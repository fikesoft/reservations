import axios from "axios";
import { api } from "./baseUrl";
export const readEvents =  async () => {
    try {
        const response = await api.get("/read-event")
        return response ;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
    }
}   