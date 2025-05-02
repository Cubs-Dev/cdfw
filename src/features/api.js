import axios from "axios";

// Vérification que VITE_API_URL est bien défini, sinon utiliser une valeur par défaut
const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
                                                        
export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export default http;