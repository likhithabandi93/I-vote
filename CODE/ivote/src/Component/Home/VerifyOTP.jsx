// src/components/VerifyOTP.js
import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useDispatch } from 'react-redux';
import {verifyOtp,resendOtp} from '../../action/Customer';


const VerifyOTP = () => {
  const dispatch = useDispatch();


  const [otp, setOtp] = useState(Array(4).fill('')); // Adjusted for 4-digit OTP
  const [isVerified, setIsVerified] = useState(null);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Update OTP array
    if (/^\d*$/.test(value) && (value.length <= 1)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }

    // Move to the previous input field if backspacing
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };
  
  const Customer = JSON.parse(sessionStorage.getItem('token'));


  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    const data = {
      email: Customer.email,
      otp: enteredOtp,
    };
    dispatch(verifyOtp(data));
  };



  

  const handleResend = () => {
    console.log(Customer.email);
    const data = {
      email: Customer.email,
    }
    dispatch(resendOtp(data));
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="bg-white shadow-md rounded-lg p-8 w-[600px]">
          <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
          <form onSubmit={handleSubmit} className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 ml-4"
            >
              Verify
            </button>
          </form>
          {isVerified === true && (
            <p className="text-green-500 text-center">OTP Verified Successfully!</p>
          )}
          {isVerified === false && (
            <p className="text-red-500 text-center">Invalid OTP. Please try again.</p>
          )}
          <div className="text-center mt-4">
            <button
              onClick={handleResend}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
