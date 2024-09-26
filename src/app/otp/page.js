"use client";

import { useEffect, useRef } from 'react';

export default function OtpPage() {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Block landscape mode on mobile
    function checkOrientation() {
      if (window.innerHeight < window.innerWidth) {
        document.body.innerHTML = '<div class="landscape-message">Please rotate your device to portrait mode</div>';
      } else {
        location.reload();
      }
    }

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("load", checkOrientation);

    // Web OTP API Autofill
    if ('OTPCredential' in window) {
      const ac = new AbortController();
      const form = document.querySelector('form');

      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }).then(otp => {
        if (otp) {
          const otpCode = otp.code; // e.g., "123456"
          alert(otpCode); // Show OTP for testing purposes

          // Fill each input box with corresponding digit
          otpCode.split('').forEach((digit, index) => {
            if (inputRefs.current[index]) {
              inputRefs.current[index].value = digit;
            }
          });

          form.submit(); // Submit form after autofill
        }
      }).catch(err => {
        console.error('Error fetching OTP:', err);
      });

      form.addEventListener('submit', () => {
        ac.abort(); // Abort the OTP request if the form is submitted manually
      });
    } else {
      console.warn('Web OTP API not supported in this browser.');
    }

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("load", checkOrientation);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        action="/api/verify-otp" // Backend route to verify OTP
        method="POST"
        className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <div className='w-full pt-2 flex justify-center gap-2'>
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)} // Attach refs to each input
              className="text-center size-10 border-2 border-black rounded-lg"
              maxLength="1"
              type="tel"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white rounded-md p-2 text-lg mt-4"
        >
          Submit OTP
        </button>
      </form>
    </div>
  );
}