import React, { useState } from 'react';
import './login.css';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate()

  const handleSwitchToSignup = () => setIsSignup(true);
  const handleSwitchToLogin = () => setIsSignup(false);

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    handleSwitchToSignup();
  };


  const handleLoginSubmit = async(e) => {
    e.preventDefault();
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
          // Navigate to the OTP page upon success
          navigate('/getotp'); // Ensure you use a valid path here
        } else {
          // Handle error or display error message
          console.error('Error:', data.message);
          alert(data.message || 'An error occurred');
        }
      } else {
        // Handle server errors
        const errorData = await response.json(); // Parse the error response
        console.error('Server error:', errorData.message);
        alert('Server error occurred. Please try again later.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      alert('Network error occurred. Please check your connection and try again.');
    }
      
  
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
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
          // Navigate to the OTP page upon success
          navigate('/getotp'); // Ensure you use a valid path here
        } else {
          // Handle error or display error message
          console.error('Error:', data.message);
          alert(data.message || 'An error occurred');
        }
      } else {
        // Handle server errors
        const errorData = await response.json(); // Parse the error response
        console.error('Server error:', errorData.message);
        alert('Server error occurred. Please try again later.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      alert('Network error occurred. Please check your connection and try again.');
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
                  <input type="submit" value="Login" />
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
                  <input type="submit" value="Signup" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
