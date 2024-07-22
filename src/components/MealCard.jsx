// MealCard.js
import React, { useEffect } from 'react';
import '../css/MealCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFoods } from '../redux/slice/foodSlice';

const MealCard = ({ mealType, totalCalories, items }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedFoods } = useSelector((state) => state.food);
    
    const handleCardClick = () => {
        dispatch(setSelectedFoods(mealType));
        navigate(`/search`);
    };

    console.log(selectedFoods)

    return (
        <div className="meal-card" onClick={handleCardClick}>
            <h2>{mealType}</h2>
            <p className="total-calories">{totalCalories} calories</p>
            <ul>
            {items.map((item) => (
                <li key={item.id}>{item.name}</li>

                ))}
            </ul>
        </div>
    );
};

export default MealCard;
