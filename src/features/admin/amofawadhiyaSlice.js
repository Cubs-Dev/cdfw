// features/admin/amofawadhiyaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  formData: {
    idsrr: '',
    nomrr: '',
    prenomrr: '',
    numtelrr: '',
    adresseemailrr: '',
    regionr: '',
  },
  loading: false,
  error: null,
};

const amofawadhiyaSlice = createSlice({
  name: 'amofawadhiya',
  initialState,
  reducers: {
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetForm(state) {
      state.formData = initialState.formData;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setIsModalOpen,
  setFormData,
  resetForm,
  setLoading,
  setError,
} = amofawadhiyaSlice.actions;

export default amofawadhiyaSlice.reducer;
