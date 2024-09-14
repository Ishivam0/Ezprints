import React, { useEffect } from 'react'
import image from '../../assets/images/preloader.png'
import './Preloader.css'
// import video from '../../assets/preloaderAnimation.mp4'

const Preloader = () => {
    
  return (
    
       <div className="container">
       <div className="circle">
       <div className="video"><video autoPlay loop src=""></video></div>
       </div>
       <div className="text">
       <h3>Getting printer ready for you...</h3>
       </div>
       </div>
  )
}

export default Preloader