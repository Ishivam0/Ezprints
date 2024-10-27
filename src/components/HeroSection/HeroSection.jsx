import React from 'react';
import './HeroSection.css'; // Import the CSS file
import Lottie from 'lottie-react';
import hello from '../../assets/animations/Hello.json'; 
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const data =JSON.parse(localStorage.getItem('user_details'))
  const name = data?.first_name;
  return (
    <section className={`hero`}>
      <div className="hero-text">
        <h1>Hi, {name}</h1>
        <p>Upload your documents seamlessly and get them printed with ease.</p>
      </div>
      <div className="hero-animation">
        <Lottie animationData={hello} loop={true} />
      </div>
    </section>
  );
};

export default HeroSection;
