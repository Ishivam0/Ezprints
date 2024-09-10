import React, { useState } from 'react';
import './login.css'; // Make sure to import your CSS file
import logo from '../../assets/images/logo.png'

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSwitchToSignup = () => {
    setIsSignup(true);
    
  };

  const handleSwitchToLogin = () => {
    setIsSignup(false);
    
  };

  const handleSignupLinkClick = (e) => {
    e.preventDefault();
    handleSwitchToSignup();
  };

  return (
    <div className="wrapper">
      <div className="title-text">
        <div className={`title login ${!isSignup ? 'active' : ''} flex flex-col justify-center items-center`} ><
            img style={{width:'150px',height:'150px',objectFit:'contain'}} src={logo} alt="" />
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
            <form className="login">
                
              <div className="field">
                <input type="email" name='email' placeholder="Email Address" required />
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
            <form className="signup">
                
                 <div className="field">
                <input type="text" name='name' placeholder="Name" required />
              </div>
              <div className="field">
                <input type="email" name='email' placeholder="Email Address" required />
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
  );
};

export default LoginForm;
