import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 25000,
  headers: {
    Accept: "application/json",
  },
});


export default apiClient;