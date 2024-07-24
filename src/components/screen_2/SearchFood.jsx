// src/components/SearchFood.js
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { IoSearch } from "react-icons/io5";
import "../../css/search.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePickerComp from "../DatePickerComp";
import MealToggle from "./MealToggle";
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import FoodCard from './FoodCard';
import FoodQtyCard from './FoodQtyCard';
import { addFoodItem } from '../../redux/slice/tempMealSlice';

const SearchFood = () => {
  const [showClear, setShowClear] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [isFocussed, setIsFocussed] = useState(true);
  const meals = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  const [nutrition, setNutrition] = useState(null);
  const [showQtyCard, setShowQtyCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const tempMealItems = useSelector((state) => state.tempMeal.tempMealData);
  const { selectedDate, selectedFoods } = useSelector((state) => state.food);

  const fetchResults = useCallback(
    debounce(async (query) => {
      if (query) {
        setLoading(true);
        try {
          const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-app-id': "4cfd35d9",
              'x-app-key': "aadf56b3f31bea462a87a6c7e14e24ca",
            },
          });
          const data = await response.json();
          setResults(data.common || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    }, 600),
    []
  );

  const fetchNutrition = async (foodName) => {
    try {
      const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        query: foodName,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': "4cfd35d9",
          'x-app-key': "aadf56b3f31bea462a87a6c7e14e24ca",
        },
      });

      const foodData = response.data.foods[0];
      setNutrition(foodData);
      setShowQtyCard(true);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    } finally {
    }
  };

  useEffect(() => {
    fetchResults(query);
  }, [query, fetchResults, meals]);

  const handleSearch = (e) => {
    setIsFocussed(false);
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    setShowClear(value.length > 0);
  };

  const handleSave = () => { 
    const currentDate = selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let currentMeals = JSON.parse(localStorage.getItem(currentDate)) || { breakfast: [], lunch: [], dinner: [] };
    let mealArray;
    if (selectedFoods.toLowerCase() === 'breakfast') {
      mealArray = currentMeals.breakfast||[];
    } else if (selectedFoods.toLowerCase() === 'lunch') {
      mealArray = currentMeals.lunch||[];
    } else if (selectedFoods.toLowerCase() === 'dinner') {
      mealArray = currentMeals.dinner||[];
    }
    tempMealItems?.forEach((item) => {
      mealArray.push(item);
    });
    if (selectedFoods.toLowerCase() === 'breakfast') {
      currentMeals.breakfast = mealArray;
    } else if (selectedFoods.toLowerCase() === 'lunch') {
      currentMeals.lunch = mealArray;
    } else if (selectedFoods.toLowerCase() === 'dinner') {
      currentMeals.dinner = mealArray;
    }
    localStorage.setItem(currentDate, JSON.stringify(currentMeals));
    navigate('/');

  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowClear(false);
    setIsFocussed(true);
  };

  const memoizedResults = useMemo(() => (
    results.map((result, index) => (
      <li key={index} onClick={() => fetchNutrition(result.food_name)}>
        {result.food_name}
      </li>
    ))
  ), [results]);

  const saveToTempMeal = (foodData) => {
    console.log(foodData)
    dispatch(addFoodItem(foodData));
    setShowQtyCard(false);
  };

  return (
    <>
      <DatePickerComp />
      <MealToggle />
      <div className='search_container'>
        <div className="icon-container">
          <IoSearch className="search-icon" />
        </div>
        <input
          type="text"
          className="input_box"
          placeholder='Search...'
          value={query}
          onChange={handleSearch}
        />
        {showClear && <button className="clear-button" onClick={clearSearch}>✖</button>}
      </div>

      {loading ? <p>Loading...</p> : <ul className="results-list">{memoizedResults}</ul>}

      <div className='foodcard__container'>
        {isFocussed && tempMealItems?.map((item, index) => (
          <FoodCard
            key={item.id}
            image={item.image}
            name={item.name}
            calories={item.calories}
            weight={item.weight}
            protein={item.protein}
            carbs={item.carbs}
            fat={item.fat}
            id={item.id}
            currQuantity={item.quantity}
          />
        ))}
      </div>
      <button onClick={handleSave} className='save-btn'>Done</button>
      <div className='foodqty_modal_container'>
      {nutrition && (
        <FoodQtyCard
          show={showQtyCard}
          onClose={() => setShowQtyCard(false)}
          initialNutritionalValues={{
            calories: Math.floor(nutrition.nf_calories),
            protein: Math.floor(nutrition.nf_protein),
            carbs: Math.floor(nutrition.nf_total_carbohydrate),
            fat: Math.floor(nutrition.nf_total_fat),
            weight: (nutrition.serving_weight_grams),
            image: nutrition.photo.thumb,
            name: nutrition.food_name,
          }}
          onSave={saveToTempMeal}
          clearSearch={clearSearch}
        />
      )}
      </div>
    </>
  );
};

export default SearchFood;
