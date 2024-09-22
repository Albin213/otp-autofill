"use client";

import { useEffect } from 'react';

export default function OtpPage() {
  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      })
      .then((otpCredential) => {
        if (otpCredential && otpCredential.code) {
          document.getElementById('otp-input').value = otpCredential.code;
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
      <form id="otp-form" action="/api/verify-otp" method="POST" className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <input
          id="otp-input"
          type="text"
          name="otp"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          required
          placeholder="Enter your OTP"
          className="w-full border border-gray-300 rounded-md p-2 text-lg mb-4"
        />
        <button type="submit" className="w-full bg-purple-600 text-white rounded-md p-2 text-lg">
          Submit OTP
        </button>
      </form>
    </div>
  );
}
