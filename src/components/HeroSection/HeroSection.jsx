import React from 'react';
import './HeroSection.css'; // Import the CSS file
import Lottie from 'lottie-react';
import hello from '../../assets/animations/hello.json'; 
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const darkModeOn = useSelector((state)=>state.darkmode.darkModeOn)
  return (
    <section className={`hero ${darkModeOn?"bg-black":"bg-white"}`}>
      <div className="hero-text">
        <h1>Hi, Shivam</h1>
        <p>Upload your documents seamlessly and get them printed with ease.</p>
      </div>
      <div className="hero-animation">
        <Lottie animationData={hello} loop={true} />
      </div>
    </section>
  );
};

export default HeroSection;
