import axios from "axios"
import {jwtDecode} from "jwt-decode";


const apiBaseUrl = import.meta.env.VITE_BACKEND_API_URL

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials:true
})
console.log(apiBaseUrl)

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


