import React, { useState } from 'react';
import './ActionSection.css'; // Make sure to create this CSS file
import { useSelector } from 'react-redux';

const ActionSection = () => {
  const [isCalculateActive, setIsCalculateActive] = useState(true);
  const DarkModeOn = useSelector((state)=>state.darkmode.DarkModeOn)

  const handleCalculateClick = () => {
    setIsCalculateActive(true);
    // Add any additional logic for Calculate button
  };

  const handleUploadClick = () => {
    setIsCalculateActive(false);
    // Add any additional logic for Upload button
  };

  return (
    <div className={`action-container  `}>
      <div className={`action-wrapper `}>
        <div className="action-controls">
          <input
            type="radio"
            name="action"
            id="calculate"
            checked={isCalculateActive}
            onChange={handleCalculateClick}
          />
          <input
            type="radio"
            name="action"
            id="upload"
            checked={!isCalculateActive}
            onChange={handleUploadClick}
          />
          <label
            htmlFor="calculate"
            className={`action-button ${isCalculateActive ? 'active' : ''}`}
            onClick={handleCalculateClick}
          >
            Calculate
          </label>
          <label
            htmlFor="upload"
            className={`action-button ${!isCalculateActive ? 'active' : ''}`}
            onClick={handleUploadClick}
          >
            Upload
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="action-content">
          {isCalculateActive ? (
            <div className="content">
              <h1 className="title">Calculate Your Print Expenses</h1>
              <button className="action-btn">Calculate</button>
            </div>
          ) : (
            <div className="content">
              <h1 className="title">Upload Your Document for Printing</h1>
              <button className="action-btn">Upload</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionSection;
