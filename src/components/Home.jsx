
import React from 'react';
import MealCard from './MealCard';
import Footer from './Footer';
import "../css/main.css";
import Header from './Header';
import CalorieChart from './CalorieChart';
import { useSelector } from 'react-redux';


const Home = () => {
    const { selectedFoods } = useSelector((state) => state.food)
    const meals = useSelector((state) => state.meals);
    console.log(selectedFoods)
    return (
        <>
            <Header />
            <CalorieChart />
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

/**
  
 */