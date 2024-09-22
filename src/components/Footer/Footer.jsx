import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaUser } from 'react-icons/fa'; // Icons for the contact info
import './Footer.css'; // External CSS for styling
import { useSelector } from 'react-redux';
import footer from '../../assets/images/footer.png'

const Footer = () => {
    const darkModeOn = useSelector(state => state.darkmode.darkModeOn)
  return (
    <footer className={`footer-container ${darkModeOn?'bg-black border-white border-t-2':''}`}>
      {/* Left Side */}
      <div className="footer-left">
        <div className="footer-name">
          <FaUser className="footer-icon" /><h2>SACHIDANAND ਠੇਕੇਦਾਰ </h2> 
        </div>
        <div className="footer-email">
          <FaEnvelope className="footer-icon" /> <p>sachidanandsabrwal@gmail.com</p>
        </div>
        <div className="footer-phone">
          <FaPhoneAlt className="footer-icon" /><p>+91-8284951325</p> 
        </div>
        <div className="footer-phone">
          <FaPhoneAlt className="footer-icon" /><p>+91-8360103913</p> 
        </div>
      </div>

      {/* Right Side */}
      <div className="footer-right">
        <div>
           <img src={footer} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
