"use client"; // Mark this as a client component if you need to use hooks like useState

import { useState } from 'react';

export default function OtpPage() {
  const [otp, setOtp] = useState('');

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
