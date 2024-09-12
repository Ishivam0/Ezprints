import React, { useState } from 'react';
import './Popup.css'; // Import the CSS file for styling
import Lottie from 'lottie-react';
import emailSent from '../../assets/animations/emailSent.json'

const Popup = ({ isOpen,animation,text,onclose }) => {
  return (
    <div className={`popup-overlay ${isOpen ? 'open' : ''}`}>
    <div className="popup-content">
    <div className="close" onClick={onclose}>
      <i class="ri-close-circle-line" style={{fontSize:24,color:"black"}}/>
      </div>
        <div className="popup-inner">
          {/* Add your animation and text here */}
          <div className="animation-container">
           <Lottie animationData={emailSent} autoPlay loop />
          </div>
          <p>Login initiated. OTP sent to your mail.</p>
        </div>
        
      </div>
    </div>
  );
};

export default Popup;
