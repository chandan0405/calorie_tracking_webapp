import React, { useState } from 'react';
import '../css/Footer.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaPlusCircle } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active route for styling
  const isActiveRoute = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="footer">
      <button
        className={`footer-button ${isActiveRoute('/') ? 'active' : ''}`}
        onClick={() => handleNavigation('/')}
      >
        <FaHome />
        <span>Home</span>
      </button>
      <button
        className={`footer-button ${isActiveRoute('/chart') ? 'active' : ''}`}
        onClick={() => handleNavigation('/chart')}
      >
        <FaChartLine />
        <span>Analytics</span>
      </button>
      <div className='btn-container'>
        <button className="add-button">
          <FaPlusCircle className='add-icon' />
        </button>
      </div>
    </div>
  );
};

export default Footer;
