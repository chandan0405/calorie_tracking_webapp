// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slice/foodSlice';
import mealReducer from './slice/mealSlice';

const store = configureStore({
  reducer: {
    food: foodReducer,
    meals: mealReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
