// src/redux/slices/foodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: new Date(),
  selectedFoods: "Breakfast",
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      console.log(state, action)
      state.selectedDate = action.payload;
    },
    setSelectedFoods: (state, action) => {
      console.log(state, action)
      state.selectedFoods = action.payload;
    },
  },
});

export const { setSelectedDate, setSelectedFoods } = foodSlice.actions;

export default foodSlice.reducer;
