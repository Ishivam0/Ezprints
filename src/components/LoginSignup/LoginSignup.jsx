import React, { useState } from 'react';
import './login.css'; // Make sure to import your CSS file
import logo from '../../assets/images/logo.png'
import { BASE_URL } from '../../../config';



const LoginForm = () => {
  const [name, setName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', loginEmail);

    fetch(`${BASE_URL}/register_login/`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', signupEmail);

    fetch(`${BASE_URL}/register_login/`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };


  return (
   <div className="login-container">
     <div className="wrapper">
      <div className="title-text">
        <div className={`title login ${!isSignup ? 'active' : ''} flex flex-col justify-center items-center`} >
          <img style={{width:'150px',height:'150px',objectFit:'contain'}} src={logo} alt="" />
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
                <input type="email" name='email' onChange={(e)=>setLoginEmail(e.target.value)} placeholder="Email Address" required />
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
                <input type="text" name='name' onChange={(e)=>setName(e.target.value)} placeholder="Name" required />
              </div>
              <div className="field">
                <input type="email" name='email' onChange={(e)=>setSignupEmail(e.target.value)} placeholder="Email Address" required />
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
