
import React from 'react';
import MealCard from './MealCard';
import Footer from './Footer';
import "../css/main.css";
import Header from './Header';
import CalorieChart from './CalorieChart';
import { useSelector } from 'react-redux';


const Home = () => {
    const meals = useSelector((state) => state.meals);
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