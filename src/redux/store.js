// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slice/foodSlice';
import mealReducer from './slice/mealSlice';
import tempMealreducer from "./slice/tempMealSlice";

const store = configureStore({
  reducer: {
    food: foodReducer,
    meals: mealReducer,
    tempMeal: tempMealreducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
