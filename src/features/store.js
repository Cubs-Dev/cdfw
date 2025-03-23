import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice"; 
import authSlice from "./auth/authSlice"; // Vérifie bien ce chemin

export default configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
  },
});
