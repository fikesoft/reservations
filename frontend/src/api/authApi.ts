import axios from "axios"
import {jwtDecode} from "jwt-decode";
import { api,apiBaseUrl } from "./baseUrl";


export const initiateGoogleAuth = () => {
    // This redirects the browser to the backend endpoint for Google OAuth
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

export const handleGoogleCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      const userData = jwtDecode(token);
      console.log("Decoded user data:", userData);
      return userData;
    } else {
      console.error("Token not found in URL");
      return null;  
    }
};

export const registerUser =  async (name:string, email:string, password:string) =>{
   try {
    const response = await api.post("/register/user",{name,email,password});
    return { status: response.status, data: response };

   } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { status: error.response?.status, data: error.response?.data };
        }
        return { status: 500, data: { message: "Unexpected error occurred" } };
    }
}

export const loginUser = async (email:string, password:string) => {
  try {
    const response =  await api.post("/login/user", {email,password})
    return {status:response.status, data: response}
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        return { status: error.response?.status, data: error.response?.data };
    }
    return { status: 500, data: { message: "Unexpected error occurred" } };
}
}


