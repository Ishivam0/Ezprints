import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Lottie from 'lottie-react'
import sent from '../../assets/animations/emailSent.json'
import './MainLayout.css'
import Popup from '../Popup/Popup'
import { BASE_URL } from '../../../config'
import { useNavigate } from 'react-router-dom'
import LogoutModal from '../../components/Modal/LogoutModal/LogoutModal'
import HeroSection from '../../components/HeroSection/HeroSection'
import { useSelector } from 'react-redux'

const MainLayout = () => {
 
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setPopupOpen(true);

  };
  const handleClosePopup =()=>{
    setPopupOpen(false);
  }
  const logoutUser = async () => {
    const token = JSON.parse(localStorage.getItem('token')); // Replace with your actual token
    

  
    try {
      const response = await fetch(`${BASE_URL}logout/`, {
        method: 'POST', // or 'DELETE' if your API requires it
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        console.log('Logout successful');
        // Handle successful logout, e.g., redirect to login page
        navigate('/')
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        // Handle the error, show a message to the user, etc.
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors
    }
  };



  return (
   <div className='mainlayout'>
    <Header />
    <HeroSection />
    <div className="popupdiv">
      <LogoutModal />
    </div>
   </div>
  )
}

export default MainLayout