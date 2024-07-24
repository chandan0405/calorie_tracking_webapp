// src/redux/slice/tempMealSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tempMealData: []
};

const tempMealSlice = createSlice({
  name: 'tempMeal',
  initialState,
  reducers: {
    addFoodItem: (state, action) => {
      const newItem = {
        ...action.payload,
        id: nanoid(),
      };
      console.log(newItem)
      state.tempMealData.push(newItem);
    },
    updateFoodItem: (state, action) => {
      console.log(action.payload);
      const index = state.tempMealData.findIndex(item => item.id === action.payload.id);
      console.log(index)
      if (index !== -1) {
        state.tempMealData[index] = {
          ...state.tempMealData[index],
          ...action.payload,
        };
      }
    },
    removeFoodItem: (state, action) => {
      console.log(action.payload)
      state.tempMealData = state.tempMealData.filter(item => item.id !== action.payload);
    },
  },
});

export const { addFoodItem, updateFoodItem, removeFoodItem } = tempMealSlice.actions;
export default tempMealSlice.reducer;
