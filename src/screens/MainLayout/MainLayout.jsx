import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/animations/error.json';
import './MainLayout.css';
import Popup from '../Popup/Popup';
import { BASE_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../../components/Modal/LogoutModal/LogoutModal';
import HeroSection from '../../components/HeroSection/HeroSection';
import { useSelector } from 'react-redux';
import ActionSection from '../../components/ActionSection/ActionSection';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({ animation: null, text: '' });
  const navigate = useNavigate();
  const darkModeOn = useSelector(state => state.darkmode.darkModeOn);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className={`mainlayout ${darkModeOn ? "bg-black" : "bg-white"}`}>
      <Header />
      <HeroSection />
      <ActionSection />
      <Footer />
      <div className="popupdiv">
        <LogoutModal />
      </div>
      <Popup
        isOpen={isPopupOpen}
        animation={popupContent.animation}
        text={popupContent.text}
        onclose={() => setPopupOpen(false)}
      />
    </div>
  );
}

export default MainLayout;
