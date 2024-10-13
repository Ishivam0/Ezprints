import React, { useState } from 'react';
import './PriceCalculator.css'; // Importing the CSS for styling
import { useSelector } from 'react-redux';

const PriceCalculator = ({ isOpen, onClose }) => {
  // States to store selected options and page count
  const [pages, setPages] = useState(50);
  const [isBWActive, setIsBWActive] = useState(true);

  // Rates per page
  const colorRate = 5;
  const bwRate = 2;

  // Function to calculate the total price
  const calculatePrice = () => {
    const rate = isBWActive ? bwRate : colorRate;
    return pages * rate;
  };

  const handleBWClick = () => {
    setIsBWActive(true);
   
  };

  const handleColoredClick = () => {
    setIsBWActive(false);
  };


  // Handle slider input change
  const handlePageChange = (event) => {
    setPages(event.target.value);
  };


  if(!isOpen) return null;

  return (
    <div className="modal-overlay">
        <div className="modal-layout-cal">
        <div className="close" onClick={onClose}>
        <i className="ri-close-circle-line" style={{ fontSize: 27, color: "white" }} />
      </div>
    <div className="modal-content-cal">
    <div className="calculator-container">
      <h2>Estimate Your Printing Cost</h2>
      <div className={`action-controls`}>
          <input
            type="radio"
            name="action"
            id="B&W"
            checked={isBWActive}
            onChange={handleBWClick}
          />
          <input
            type="radio"
            name="action"
            id="colored"
            checked={!isBWActive}
            onChange={handleColoredClick}
          />
          <label
            htmlFor="B&W"
            className={`action-button ${isBWActive ? 'active1' : ''}`}
            onClick={handleBWClick}
          >
            B&W
          </label>
          <label
            htmlFor="colored"
            className={`action-button ${!isBWActive ? 'active2' : ''}`}
            onClick={handleColoredClick}
          >
            Colored
          </label>
          <div className="slider-tab"></div>
        </div>

      {/* Range slider to select the number of pages */}
      <div className="page-slider">
        <label htmlFor="pages">Number of Pages: {pages}</label>
        <input
          id="pages"
          type="range"
          min="0"
          max="500"
          value={pages}
          onChange={handlePageChange}
          step="3"
        />
      </div>

      {/* Display the total price dynamically */}
      <div className="price-display">
        <h3>Total Cost: ₹{calculatePrice()}</h3>
        <p>For {pages} pages of {isBWActive ? "Black & White" : "Color"} printing.</p>
      </div>
    </div>
    </div>
        </div>
    </div>
  );
};

export default PriceCalculator;
