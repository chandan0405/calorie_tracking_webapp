import React from 'react';
import "../../css/mealToggle.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFoods } from '../../redux/slice/foodSlice';

const MealToggle = () => {
    const dispatch = useDispatch();
    const selectedFoods = useSelector((state) => state.food.selectedFoods);
    const handleMealClick = (meal) => {
        dispatch(setSelectedFoods(meal));
    };

    return (
        <div className='meal_container'>
            <div
                className={`meal_section ${selectedFoods.toLowerCase() === 'breakfast' ? 'active' : ''}`}
                onClick={() => handleMealClick('breakfast')}
            >
                <div className="meal_title">Breakfast</div>
            </div>
            <div
                className={`meal_section ${selectedFoods.toLowerCase() === 'lunch' ? 'active' : ''}`}
                onClick={() => handleMealClick('lunch')}
            >
                <div className="meal_title">Lunch</div>
            </div>
            <span className='divider'></span>
            <div
                className={`meal_section ${selectedFoods.toLowerCase() === 'dinner' ? 'active' : ''}`}
                onClick={() => handleMealClick('dinner')}
            >
                <div className="meal_title">Dinner</div>
            </div>
        </div>
    );
};

export default MealToggle;
