import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import profile from '../../assets/images/preloader.png'
import './Header.css'

const Header = () => {
  const [username, setUsername] = useState('Shivam')
  return (
    <div className='container'>
      <img className='logo' src={logo} alt="" />
      <nav>
      <ul>
      <div className="user flex gap-2 items-center justify-center">
        <h4 className='font-black-500'>Hi, {username}</h4>
        <div className="user-icon bg-white w-10 h-10">
          <img className='profile' src={profile} alt="" />
        </div>
        </div>
      </ul>
     
      <ul><img className='theme' src={profile} alt="" /></ul>
      </nav>
        
    </div>
  )
}

export default Header