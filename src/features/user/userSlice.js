import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../api";

const initialState = {
  users: [],
  user: {},
  error: null,
};

// Création de l'utilisateur avec gestion des erreurs
export const createUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await http.post("/users/add", userData);
      return res.data; // Retourne les données en cas de succès
    } catch (err) {
      // Utilise rejectWithValue pour renvoyer un message d'erreur détaillé
      return rejectWithValue(err.response?.data?.message || 'Une erreur est survenue lors de la création de l’utilisateur');
    }
  }
);

// Récupérer les utilisateurs avec gestion des erreurs
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/users/rbr");
      return res.data; // Retourne les données des utilisateurs
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Une erreur est survenue lors de la récupération des utilisateurs');
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload; // Remplacer les utilisateurs
    },
    setUser: (state, action) => {
      state.user = action.payload; // Mettre à jour l'utilisateur sélectionné
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Ajouter l'utilisateur créé à la liste des utilisateurs
        state.error = null; // Réinitialiser l'erreur
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload; // Enregistrer l'erreur dans l'état
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Remplacer la liste des utilisateurs par celle reçue
        state.error = null; // Réinitialiser l'erreur
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload; // Enregistrer l'erreur dans l'état
      });
  },
});

export default userSlice.reducer;
