import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../api";

const initialState = {
  users: [],
  user: {},
  error: null,
};

// Fonction pour filtrer les utilisateurs
const filterUsers = (users, currentUserId) => {
  if (!currentUserId) return users.filter(user => user.role !== 'admin');
  return users.filter(user => user._id !== currentUserId && user.role !== 'admin');
};

// 🔵 Créer un utilisateur
export const createUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await http.post("/users/add", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur lors de la création de l'utilisateur");
    }
  }
);

// 🔵 Modifier (update) un utilisateur
export const updateUser = createAsyncThunk(
  "users/update", // Nom de l'action dans Redux
  async (userData, { rejectWithValue }) => { // userData contient les informations à mettre à jour
    try {
      // Effectuer la requête PUT avec les données de l'utilisateur
      const res = await http.put(`/users/${userData.id}`, userData);
      console.log(res); // ✅ Affiche la réponse du serveur ici pour vérifier
      return res.data; // Retourne les données mises à jour reçues du serveur
    } catch (err) {
      // Si une erreur survient, renvoyer un message d'erreur personnalisé
      return rejectWithValue(err.response?.data?.message || "Erreur lors de la mise à jour de l'utilisateur");
    }
  }
);

// 🔵 Fetch utilisateurs RBR
export const fetchUsersrbr = createAsyncThunk(
  "users/fetchRbr",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/users/rbr");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement des utilisateurs RBR");
    }
  }
);

// 🔵 Fetch utilisateurs Leader
export const fetchUsersleader = createAsyncThunk(
  "users/fetchLeader",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/users/leader");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur lors du chargement des utilisateurs Leader");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ➡️ Création d'un utilisateur
      .addCase(createUser.fulfilled, (state, action) => {
        const exists = state.users.find(user => user._id === action.payload._id);
        if (!exists) {
          state.users.push(action.payload);
        }
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ➡️ Update d'un utilisateur
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        );
        if (state.user._id === updatedUser._id) {
          state.user = updatedUser;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ➡️ Gestion des fetchs utilisateurs RBR / Leader
      .addMatcher(
        (action) => [fetchUsersrbr.fulfilled.type, fetchUsersleader.fulfilled.type].includes(action.type),
        (state, action) => {
          const filtered = filterUsers(action.payload, state.user._id);
          const uniqueUsers = filtered.filter(
            (user) => !state.users.some(existing => existing._id === user._id)
          );
          state.users = [...state.users.filter(user => user._id !== state.user._id), ...uniqueUsers];
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [fetchUsersrbr.rejected.type, fetchUsersleader.rejected.type].includes(action.type),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

// Exports
export const { setUsers, setUser } = userSlice.actions;
export default userSlice.reducer;
