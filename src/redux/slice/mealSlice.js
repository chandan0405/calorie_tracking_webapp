
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    mealType: 'Breakfast',
    totalCalories: 0,
    items: [],
  },
  {
    mealType: 'Lunch',
    totalCalories: 0,
    items: [],
  },
  {
    mealType: 'Dinner',
    totalCalories: 0,
    items: [],
  },
];

const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addFoodToMeal: (state, action) => {
      const { mealType, food } = action.payload;
      const meal = state.find((meal) => meal.mealType === mealType);
      if (meal) {
        meal.items.push(food);
        meal.totalCalories += food.calories;
      }
    },
  },
});

export const { addFoodToMeal } = mealSlice.actions;

export default mealSlice.reducer;
