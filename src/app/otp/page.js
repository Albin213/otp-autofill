"use client";

import { useState, useEffect } from 'react';

export default function OtpPage() {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Check if the browser supports the Web OTP API
    if ('OTPCredential' in window) {
      navigator.credentials.get({ otp: { transport: ['sms'] } })
        .then(otpCredential => {
          if (otpCredential && otpCredential.code) {
            setOtp(otpCredential.code);
          }
        })
        .catch(err => {
          console.error('Error while fetching OTP: ', err);
        });
    }
  }, []);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Submitted: ${otp}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="Enter your OTP"
          className="w-full border border-gray-300 rounded-md p-2 text-lg mb-4"
          inputMode="numeric" // helps mobile devices to show numeric keyboards
          maxLength="4" // Restricting input to 4 digits
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-md p-2 text-lg"
        >
          Submit OTP
        </button>
      </form>
    </div>
  );
}
