import React, { useState } from 'react';
import './Popup.css'; // Import the CSS file for styling
import Lottie from 'lottie-react';


const Popup = ({ isOpen,animation,text,onclose }) => {
  if(isOpen) { return (
    <div className={`popup-overlay ${isOpen ? 'open' : ''}`}>
    <div className="popup-content">
    <div className="close" onClick={onclose}>
      <i className="ri-close-circle-line" style={{fontSize:24,color:"black"}}/>
      </div>
        <div className="popup-inner">
          {/* Add your animation and text here */}
          <div className="animation-container">
           <Lottie animationData={animation} autoPlay loop />
          </div>
          <p>{text}</p>
        </div>
        
      </div>
    </div>
  );}
};

export default Popup;
