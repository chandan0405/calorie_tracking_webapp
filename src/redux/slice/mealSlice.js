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
      const { consumerMealType, food } = action.payload;
      const meal = state.find((meal) => meal.mealType.toLowerCase() === consumerMealType.toLowerCase());
      console.log(meal)
      if (meal) {
        meal.items.push(food);
        meal.totalCalories += food.calories;
      }
      console.log('State after update:', JSON.stringify(state, null, 2));
    },
  },
});

export const { addFoodToMeal } = mealSlice.actions;

export default mealSlice.reducer;
