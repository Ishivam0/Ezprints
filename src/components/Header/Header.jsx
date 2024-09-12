import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/preloader.png";
import "./Header.css";
import "remixicon/fonts/remixicon.css";

const Header = () => {
  const [darkMode, setdarkMode] = useState(true);
  const [username, setUsername] = useState("sukhwinder");
  return (
    <div className={`header-container ${darkMode?'bg-black':'bg-white'}`}>
      <img className="logo" src={logo} alt="" />
      <div className="right-panel">
        <div className="user">
          <h4 className={` ${darkMode?'text-white-500':'text-black-500'} `} >Hi, {username}</h4>
          <div className={`user-icon border-gray border-2`}>
            <img className="profile" src={profile} alt="" />
          </div>
        </div>
        {darkMode ? <div className="flex gap-3">
          <i
            onClick={() => setdarkMode(!darkMode)}
            style={{ fontSize: 24, color: "white" }}
            class="ri-sun-line"
          />
          <i style={{ fontSize: 24, color: "white" }} class="ri-logout-box-r-line"></i>
        </div>
          
         : <div className="flex gap-3">
          <i
            onClick={() => setdarkMode(!darkMode)}
            style={{ fontSize: 24, color: "black" }}
            class="ri-moon-clear-line"
          />
          <i style={{ fontSize: 24, color: "black" }} class="ri-logout-box-r-line"></i>
        </div>
          
        }
        
      </div>
    </div>
  );
};

export default Header;
