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
      return state.map(meal => {
        if (meal.mealType.toLowerCase() === consumerMealType.toLowerCase()) {
          return {
            ...meal,
            items: [...meal.items, food],
            totalCalories: meal.totalCalories + food.calories,
          };
        }
        return meal;
      });
    },
  },
});

export const { addFoodToMeal } = mealSlice.actions;
export default mealSlice.reducer;


// console.log('State after update:', JSON.stringify(state, null, 2));