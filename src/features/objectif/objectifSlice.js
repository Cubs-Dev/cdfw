import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../api";

const initialState = {
  objectifs: [],
  objectif: {},
  error: null,
  loading: false,
};

// 🎯 Créer un objectif
export const createObjectif = createAsyncThunk(
  "objectifs/create",
  async (objectifData, { rejectWithValue }) => {
    try {
      const res = await http.post("/objectifs/add", objectifData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return res.data.objectif;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur lors de la création de l’objectif"
      );
    }
  }
);

// 📥 Récupérer tous les objectifs
export const getObjectifs = createAsyncThunk(
  "objectifs/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/objectifs/get");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur lors de la récupération des objectifs"
      );
    }
  }
);

const objectifSlice = createSlice({
  name: "objectif",
  initialState,
  reducers: {
    setObjectif: (state, action) => {
      state.objectif = action.payload;
    },
    resetObjectifError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createObjectif.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createObjectif.fulfilled, (state, action) => {
        state.objectifs.push(action.payload);
        state.loading = false;
      })
      .addCase(createObjectif.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getObjectifs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getObjectifs.fulfilled, (state, action) => {
        state.objectifs = action.payload;
        state.loading = false;
      })
      .addCase(getObjectifs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setObjectif, resetObjectifError } = objectifSlice.actions;

export default objectifSlice.reducer;
