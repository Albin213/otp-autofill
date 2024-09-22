"use client"; // For using React hooks

import { useEffect } from 'react';

export default function OtpPage() {
  useEffect(() => {
    // Web OTP API - Fetch OTP from SMS
    if ('OTPCredential' in window) {
      const ac = new AbortController(); // AbortController allows you to control the request

      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal, // Abort signal in case you need to cancel the request
        })
        .then((otpCredential) => {
          if (otpCredential && otpCredential.code) {
            // Autofill the OTP into the input field
            const otpInput = document.getElementById('otp-input');
            otpInput.value = otpCredential.code;

            // Automatically submit the form once OTP is received
            document.getElementById('otp-form').submit();
          }
        })
        .catch((err) => {
          console.error('Error fetching OTP:', err);
        });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        id="otp-form"
        action="/api/verify-otp" // Backend route to verify OTP
        method="POST"
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <input
          id="otp-input"
          type="text"
          name="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}" // Adjust for a 6-digit OTP
          required
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
