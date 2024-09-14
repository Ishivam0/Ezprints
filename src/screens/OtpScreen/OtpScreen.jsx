import React, { useState } from 'react'
import '../../components/LoginSignup/login.css'
import logo from '../../assets/images/logo.png'
import { BASE_URL } from '../../../config'
import { useNavigate } from 'react-router-dom'
import otpSuccess from '../../assets/animations/otpsuccess.json'
import otpFailure from '../../assets/animations/otpfailure.json'

const OtpScreen = () => {
  const navigate = useNavigate();
    const [otp, setOtp] = useState();
    const email = JSON.parse(localStorage.getItem('email'));

    const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({ animation: null, text: '' });
    const handleOtpSubmit = async(e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp );

  
      try {
        const response = await fetch(`${BASE_URL}verify_otp/`, {
          method: 'POST',
          body: formData,
        });
    
        // Check if the response was successful
        if (response.ok) {
          const data = await response.json();
          
          
    
          // Check the success message in the response data
          if (data.success) { 
            setPopupContent({
              animation: otpSuccess,
              text: data.message,
            });
            setPopupOpen(true);
            setTimeout(() => {
              navigate('/home'); // Ensure you use a valid path here
            }, 2000);
          } else {
            setPopupContent({
              animation: otpFailure, // Use an appropriate animation for error
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
      }
    };
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
           <form className="login" onSubmit={handleOtpSubmit}>
               
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