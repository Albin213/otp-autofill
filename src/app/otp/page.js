"use client";

import { useEffect } from 'react';

export default function OtpPage() {
  useEffect(() => {
    if ('OTPCredential' in window) {
      alert('Web OTP API is supported.');
      const input = document.querySelector('input[autocomplete="one-time-code"]');
      if (!input) return;

      const ac = new AbortController();
      const form = input.closest('form');
      if (form) {
        form.addEventListener('submit', e => {
          ac.abort();
        });
      }

      // Invoke the Web OTP API
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }).then(otp => {
        alert('Received OTP: ' + otp.code); // Show received OTP
        input.value = otp.code;
        if (form) form.submit();
      }).catch(err => {
        alert('Error fetching OTP: ' + err.message); // Show error
      });
    } else {
      alert('Web OTP API not supported in this browser.');
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        action="/api/verify-otp"
        method="POST"
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
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

