import React, { useState } from 'react';
import './ActionSection.css'; // Make sure to create this CSS file
import { useSelector } from 'react-redux';
import DocumentUploadModal from '../Modal/DocumentUploadModal/DocumentUploadModal';
import PriceCalculator from '../PriceCalculator/PriceCalculator';

const ActionSection = () => {
  const [isCalculateActive, setIsCalculateActive] = useState(true);
  const [isPriceCalculatorOpen, setPriceCalculatorOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const darkModeOn = useSelector((state)=>state.darkmode.darkModeOn)

  const handleCalculateClick = () => {
    setIsCalculateActive(true);
   
  };

  const handleUploadClick = () => {
    setIsCalculateActive(false);
  };

  const uploadfile = () => {
    setModalOpen(true); 
  }

  const openPriceCalculator = () => {
    setPriceCalculatorOpen(true);
  };

  return (
    <div className={`action-container  `}>
      <div className={`action-wrapper `}>
        <div className={`action-controls ${darkModeOn?"":"border-2 border-gray-400"}`}>
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
              <button className="action-btn" id='calculate' onClick={openPriceCalculator}>Calculate</button>
            </div>
          ) : (
            <div className="content">
              <h1 className="title">Upload Your Document for Printing</h1>
              <button onClick={uploadfile} className="action-btn" id='upload'>Upload</button>
            </div>
          )}
        </div>
      </div>
      <DocumentUploadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <PriceCalculator
        isOpen={isPriceCalculatorOpen}
        onClose={() => setPriceCalculatorOpen(false)}
      />
    </div>
  );
};

export default ActionSection;

