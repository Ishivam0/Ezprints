import React, { useState } from 'react';
import './login.css'; // Ensure this file has your CSS styles
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const LoginForm = () => {
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate()
  const baseUrl = 'https://5d30-124-253-61-251.ngrok-free.app/'

  const handleSwitchToSignup = () => setIsSignup(true);
  const handleSwitchToLogin = () => setIsSignup(false);

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    handleSwitchToSignup();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const data = { email: loginEmail };

    try {
      const response = await fetch(`${baseUrl}register_login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('response', response)
      debugger

      if (response.ok) {
        // Redirect to OTP verification page or handle OTP
        console.log('Login successful:', result);
        navigate('getotp')
      } else {
        console.error('Login failed:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', name); // Example for a name field
    data.append('email', signupEmail); // Example for an email field
  
    try {
      // Make the POST request with axios
      const response = await axios.post(`${baseUrl}register_login/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Optional: axios usually sets this automatically for FormData
        },
      });
  
      console.log(response.data); // Log the response data
      // Perform any additional logic based on the response, such as navigation
  
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
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
