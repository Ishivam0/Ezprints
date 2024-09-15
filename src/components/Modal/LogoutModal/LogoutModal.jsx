import React, { useState } from 'react';
import './LogoutModal.css'; // Import the CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { closeLogoutModal } from '../../../redux/features/slices/LogoutModalSlice';
import { useNavigate } from 'react-router-dom';


const LogoutModal = () => {
    const {isLogoutModalOpen} = useSelector((state)=>state.logout)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('user_details');

      dispatch(closeLogoutModal());

      navigate('/');
    }

  return (
    <div className={`popup-overlay ${isLogoutModalOpen ? 'open' : ''}`}>
    <div className="popup-content">
        <div className="popup-inner">
          {/* Add your animation and text here */}
          <div className="heading-container">
           <h4>Are you sure?</h4>
          </div>
         <div className="btns">
            <button className='btn1' onClick={()=>dispatch(closeLogoutModal())}>Cancel</button>
            <button className='btn2' onClick={handleLogout}>Logout</button>
         </div>
        </div>
        
      </div>
    </div>
  );
};

export default LogoutModal;
