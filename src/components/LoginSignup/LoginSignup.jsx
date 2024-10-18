import React, { useEffect, useState } from 'react';
import './login.css';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import emailSent from '../../assets/animations/emailSent.json'
import errorAnimation from '../../assets/animations/error.json'
import Popup from '../../screens/Popup/Popup'

const LoginForm = () => {
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const handleSwitchToSignup = () => setIsSignup(true);
  const handleSwitchToLogin = () => setIsSignup(false);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({ animation: null, text: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);


  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    handleSwitchToSignup();
  };

  const handleLoginLinkClick = (e) => {
    e.preventDefault();
    handleSwitchToLogin();
  };


  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append('email', loginEmail);
    localStorage.setItem('email', JSON.stringify(loginEmail));

    try {
      const response = await fetch(`${BASE_URL}login/`, {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response was successful
      if (response.ok) {
        const data = await response.json();
  
        // Check the success message in the response data
        if (data.success) { 
          setPopupContent({
            animation: emailSent,
            text: data.message,
          });
          setPopupOpen(true);
          setTimeout(() => {
            navigate('/getotp'); // Ensure you use a valid path here
          }, 3000);
        } else {
          setPopupContent({
            animation: errorAnimation, // Use an appropriate animation for error
            text: data.message || 'An error occurred',
          });
          setPopupOpen(true);
        }
      } else {
        // Handle server errors
        const errorData = await response.json(); // Parse the error response
        setPopupContent({
          animation: errorAnimation,
          text: 'Server error occurred. Please try again later.',
        });
        setPopupOpen(true);
        console.log("Server Error:",errorData.message)
      }
    } catch (error) {
      setPopupContent({
        animation: errorAnimation,
        text: 'Network error occurred. Please check your connection and try again.',
      });
      setPopupOpen(true);
      console.log("error:",error)
    }finally{
      setloading(false);
    }
      
  
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', signupEmail);
    localStorage.setItem('email', JSON.stringify(signupEmail));
  
    try {
      const response = await fetch(`${BASE_URL}register/`, {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response was successful
      if (response.ok) {
        const data = await response.json();
  
        // Check the success message in the response data
        if (data.success) { 
          setPopupContent({
            animation: emailSent,
            text: data.message,
          });
          setPopupOpen(true);
          setTimeout(() => {
            navigate('/getotp'); // Ensure you use a valid path here
          }, 2000);
        } else {
          setPopupContent({
            animation: errorAnimation, // Use an appropriate animation for error
            text: data.message || 'An error occurred',
          });
          setPopupOpen(true);
        }
      } else {
        // Handle server errors
        const errorData = await response.json(); // Parse the error response
        setPopupContent({
          animation: errorAnimation,
          text: 'Server error occurred. Please try again later.',
        });
        setPopupOpen(true);
        console.log("Server Error:",errorData.message)
      }
    } catch (error) {
      setPopupContent({
        animation: errorAnimation,
        text: 'Network error occurred. Please check your connection and try again.',
      });
      setPopupOpen(true);
      console.log("error:",error)
    }finally{
      setloading(false);
    }
  };



  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title-text">
          <div className={`title login ${!isSignup ? 'active' : ''} flex flex-col justify-center items-center`}>
            <img style={{ width: '150px', height: '150px', objectFit: 'contain' }} src={logo} alt="" />
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={!isSignup}
              onChange={handleSwitchToLogin}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={isSignup}
              onChange={handleSwitchToSignup}
            />
            <label
              htmlFor="login"
              className={`slide login ${!isSignup ? 'active' : ''}`}
              onClick={handleSwitchToLogin}
            >
              Login
            </label>
            <label
              htmlFor="signup"
              className={`slide signup ${isSignup ? 'active' : ''}`}
              onClick={handleSwitchToSignup}
            >
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            {!isSignup ? (
              <form className="login" onSubmit={handleLoginSubmit}>
                <div className="field">
                  <input
                    type="email"
                    name="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  {loading? <div class="loader"></div> : <input type="submit" value="Login" />}
                  
                </div>
                <div className="signup-link">
                  Not a member? <a href="#" onClick={handleSignupLinkClick}>Signup now</a>
                </div>
              </form>
            ) : (
              <form className="signup" onSubmit={handleSignupSubmit}>
                <div className="field">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="email"
                    name="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  {loading?<div className='loader'></div> : <input type="submit" value="Signup" />}
                  
                </div>
                <div className="signup-link">
                  Already a member? <a href="#" onClick={handleLoginLinkClick}>Login now</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        animation={popupContent.animation}
        text={popupContent.text}
        onclose={() => setPopupOpen(false)}
      />
    </div>
  );
};

export default LoginForm;
