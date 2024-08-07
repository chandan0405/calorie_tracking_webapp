import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import '../css/datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../redux/slice/foodSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const DatePickerComp = () => {
  const selectedDate = useSelector((state) => state.food.selectedDate);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(selectedDate.toLocaleString('default', { month: 'long' }));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(date));
    setMonth(date.toLocaleString('default', { month: 'long' }));
    setIsOpen(false);
    // Update the URL only if we are in the search route
    if (location.pathname.startsWith('/search')) {
      const formattedDate = date.toLocaleDateString('en-CA');
      navigate(`/search/${formattedDate}`);
    }
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="date-picker-container">
      <div className="date-picker-header">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="month-dropdown"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={new Date(0, i).toLocaleString('default', { month: 'long' })}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <button className="calendar-button" onClick={toggleCalendar}>
          <FaCalendarAlt />
        </button>
      </div>
      <div className='week-container'>
        <RenderWeek selectedDate={selectedDate} onDateChange={handleDateChange} />
      </div>
      {isOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
        />
      )}
    </div>
  );
};

export default DatePickerComp;

export const RenderWeek = ({ selectedDate, onDateChange }) => {
  const startOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(date.setDate(diff));
  };

  const endOfWeek = (date) => {
    const start = startOfWeek(date);
    return new Date(start.setDate(start.getDate() + 6));
  };

  const start = startOfWeek(new Date(selectedDate));
  const end = endOfWeek(new Date(selectedDate));
  const week = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    week.push(new Date(date));
  }

  return week.map((date, index) => (
    <div 
      key={index} 
      onClick={() => onDateChange(date)} 
      className={`week-day ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''} dd`}
    >
      <div className="week-day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
      <div className="week-day-date">{date.getDate()}</div>
    </div>
  ));
};
