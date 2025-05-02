import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import authSlice from "./auth/authSlice";
import objectifSlice from "./objectif/objectifSlice"; // ✅ Correct

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    objectif: objectifSlice, // ✅ Bien ajouté ici
  },
});

export default store;
