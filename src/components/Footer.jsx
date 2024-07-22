// Footer.js
import React from 'react';
import '../css/Footer.css';

import { FaHome, FaChartLine, FaPlusCircle } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <button className="footer-button">
                    <FaHome />
                    <span>Home</span>
                </button>
                <button className="footer-button">
                    <FaChartLine />
                    <span>Analytics</span>
                </button>
                <div className='btn-container'>
                    <div className="add-button">
                        <FaPlusCircle className='add-icon' />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Footer;

{
    /**
     * <button className="footer-button add-button">
                <FaPlusCircle />
            </button>
     */
}