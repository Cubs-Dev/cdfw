import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../api"; // Assurez-vous que le chemin est correct

// Thunk pour la connexion
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await http.post("/auth/login", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur de connexion");
  }
});

// Thunk pour la déconnexion
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  userRole: JSON.parse(localStorage.getItem("user"))?.role || null, // Ajout du rôle utilisateur
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userRole = action.payload.user.role; // Stockage du rôle utilisateur
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.userRole = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
