import React, { useEffect, useState } from 'react'
import '../../components/LoginSignup/login.css'
import logo from '../../assets/images/logo.png'
import { BASE_URL } from '../../../config'
import { useNavigate } from 'react-router-dom'
import otpSuccess from '../../assets/animations/otpsuccess.json'
import otpFailure from '../../assets/animations/otpfailure.json'
import errorAnimation from '../../assets/animations/error.json'
import Popup from '../Popup/Popup'

const OtpScreen = () => {
  const navigate = useNavigate();
    const [otp, setOtp] = useState();
    const email = JSON.parse(localStorage.getItem('email'));
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ animation: null, text: '' });

    useEffect(() => {
      const email = localStorage.getItem('email');
      if (!email) {
        navigate('/');
      }
    }, [navigate]);
    
    const fetchUserDetails = async (token) => {
      try {
        const response = await fetch(`${BASE_URL}user_get_details/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userDetailsData = await response.json();

          if (userDetailsData.success) {
            localStorage.setItem('user_details', JSON.stringify(userDetailsData.user_details));
          } else {
            setPopupContent({
              animation: errorAnimation,
              text: userDetailsData.message,
            });
            setPopupOpen(true);
            console.error('Error fetching user details:', userDetailsData);
          }
        } else {
          setPopupContent({
            animation: errorAnimation,
            text: 'Server error while fetching user details',
          });
          setPopupOpen(true);
          console.error('Server error while fetching user details');
        }
      } catch (error) {
        setPopupContent({
          animation: errorAnimation,
          text: 'Network error occurred. Please check your connection and try again.',
        });
        setPopupOpen(true);
        console.log('Error:', error);
      }
    };

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
    
        if (response.ok) {
          const data = await response.json();                   
           if (data.success) { 
            const token = data.token
            localStorage.setItem('token', token);

            setPopupContent({
              animation: otpSuccess,
              text: data.message,
            });
            setPopupOpen(true);

            fetchUserDetails(token);

            setTimeout(() => {
              navigate('/home'); 
            }, 3000);
          } else {
            setPopupContent({
              animation: otpFailure, 
              text: data.message || 'An error occurred',
            });
            setPopupOpen(true);
          }
        } else {
          const errorData = await response.json();
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
   <Popup
        isOpen={isPopupOpen}
        animation={popupContent.animation}
        text={popupContent.text}
        onclose={() => setPopupOpen(false)}
      />
  </div>
  )
}

export default OtpScreen