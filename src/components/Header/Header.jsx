import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import userprofile from "../../assets/animations/userProfile.json";
import "./Header.css";
import "remixicon/fonts/remixicon.css";
import { useDispatch, useSelector } from "react-redux";
import { openLogoutModal } from "../../redux/features/slices/LogoutModalSlice";
import { toggleMode } from "../../redux/features/slices/darkModeSlice";
import Lottie from "lottie-react";

const Header = () => {
 const darkModeOn = useSelector((state)=>state.darkmode.darkModeOn)
 const {isLogoutModalOpen} = useSelector((state)=>state.logout)
 const data = JSON.parse(localStorage.getItem('user_details'))
 const name = data?.first_name;
  const dispatch = useDispatch();
  return (
    <div className={`header-container ${darkModeOn?'bg-black border-white border-b-2':'bg-white'}`}>
      <img className="logo" src={logo} alt="" />
      <div className="right-panel">
        <div className="user">
          <h4 className={` ${darkModeOn?'text-white-500':'text-black-500'} `} >Hi, {name}</h4>
          <div className={`user-icon border-gray border-2`}>
            <Lottie className="profile" animationData={userprofile} autoPlay loop />
          </div>
        </div>
        <div className="flex gap-3">
          <i
            onClick={() => dispatch(toggleMode())}
            style={{ fontSize: 24, color: `${darkModeOn?"white":"black"}` }}
            className={`${darkModeOn?"ri-sun-line":"ri-moon-clear-line"}`}
          />
          <i onClick={()=>dispatch(openLogoutModal())} style={{ fontSize: 24, color: `${darkModeOn?"white":"black"}`}} className="ri-logout-box-r-line"></i>
        </div>
        
      </div>
    </div>
  );
};

export default Header;
