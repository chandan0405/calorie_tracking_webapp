
import React, { useEffect, useState } from 'react';
import MealCard from './MealCard';
import Footer from './Footer';
import "../css/main.css";
import Header from './Header';
import CalorieChart from './CalorieChart';
import { useSelector } from 'react-redux';


const Home = () => {
    const [meals, setMeals] = useState([]);
    const { selectedDate } = useSelector((state) => state.food);

    // Function to fetch meals from localStorage for the selected date
    const fetchMeals = (date) => {
         const currentDate = selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const storedMeals = JSON.parse(localStorage.getItem(currentDate)) || { breakfast: [], lunch: [], dinner: [] };
        return [
            { mealType: 'breakfast', items: storedMeals.breakfast, totalCalories: storedMeals.breakfast.reduce((acc, item) => acc + item.calories, 0) },
            { mealType: 'lunch', items: storedMeals.lunch, totalCalories: storedMeals.lunch.reduce((acc, item) => acc + item.calories, 0) },
            { mealType: 'dinner', items: storedMeals.dinner, totalCalories: storedMeals.dinner.reduce((acc, item) => acc + item.calories, 0) }
        ];
    };

    useEffect(() => {
        setMeals(fetchMeals(selectedDate));
    }, [selectedDate]);
    console.log(meals)
    return (
        <>
            <Header />
            <CalorieChart meals={meals} />
            <div className="main">
                {meals?.map((meal, index) => (
                    <MealCard
                        key={index}
                        mealType={meal.mealType}
                        totalCalories={meal.totalCalories}
                        items={meal.items}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Home;
