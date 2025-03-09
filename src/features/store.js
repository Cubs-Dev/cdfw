import { configureStore } from '@reduxjs/toolkit';
import amofawadhiyaReducer from '../features/admin/amofawadhiyaSlice';

const store = configureStore({
  reducer: {
    amofawadhiya: amofawadhiyaReducer,
  },
});

export default store;
