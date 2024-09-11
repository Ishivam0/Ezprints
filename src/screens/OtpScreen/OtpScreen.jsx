import React, { useState } from 'react'
import '../../components/LoginSignup/login.css'
import logo from '../../assets/images/logo.png'

const OtpScreen = () => {
    const [otp, setOtp] = useState()
  return (
    <div className="login-container">
    <div className="wrapper">
     <div className="title-text">
       <div className={`title login active flex flex-col justify-center items-center`} >
         <img style={{width:'150px',height:'150px',objectFit:'contain'}} src={logo} alt="" />
           </div>
     </div>
     <div className="form-container">
       <div className="form-inner">
           <form className="login">
               
             <div className="field">
               <input type="number" name='otp' onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" required />
             </div>
             
             
             <div className="field btn">
               <div className="btn-layer"></div>
               <input type="submit" value="Submit" />
             </div>
           </form>
       </div>
     </div>
   </div>
  </div>
  )
}

export default OtpScreen