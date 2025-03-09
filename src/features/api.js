import axios from "axios";

let baseURL = import.meta.env.VITE_API_URL;
export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
