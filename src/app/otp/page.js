"use client";

import { useEffect, useRef } from 'react';

export default function OtpPage() {
  const inputRefs = Array.from({ length: 4 }, () => useRef(null));

  const focusNext = (index, event) => {
    const value = event.target.value;

    // Handle backspace
    if (event.key === "Backspace" && index > 0 && value === "") {
      inputRefs[index - 1].current.focus();
    } else if (value !== "" && index < 3) {
      // Move to the next field
      inputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    if ('OTPCredential' in window) {
      const inputs = document.querySelectorAll('input[autocomplete="one-time-code"]');
      if (inputs.length === 0) return;

      const ac = new AbortController();

      // Invoke the Web OTP API
      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }).then(otp => {
        if (otp) {
          const otpCode = otp.code.split('');
          otpCode.forEach((digit, index) => {
            inputRefs[index].current.value = digit; // Autofill OTP
          });
          // Automatically submit the form after receiving OTP
          // (if needed, you can submit the form here)
        }
      }).catch(err => {
        console.error('Error fetching OTP:', err);
      });

      return () => {
        ac.abort(); // Cleanup on component unmount
      };
    } else {
      console.warn('Web OTP API not supported in this browser.');
    }
  }, []);

  return (
    <div className='w-screen h-screen fixed top-0 left-0 backdrop-blur-[3px] flex justify-center items-center poppins-font'>
      <div className='w-[90%] sm:w-[500px] max-w-[500px] h-[280px] pb-5 rounded-2xl bg-white popup-button-shadow'>
        <div className='w-full h-1/4 bg-gradient-to-b from-[#414141] to-[#000000] rounded-t-2xl flex justify-center items-center relative'>
          <p className='text-white font-semibold text-base sm:text-lg'>Enter your OTP</p>
        </div>
        <div className='w-full h-1/2 flex flex-col justify-center items-center gap-0'>
          <div className='w-full pt-2 flex justify-center gap-8'>
            {Array.from({ length: 4 }, (_, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                className="text-center size-10 border-2 border-black rounded-lg w-16 h-16"
                maxLength="1"
                onChange={(event) => focusNext(index, event)}
                onKeyDown={(event) => focusNext(index, event)}
                type="tel"
                autoComplete="one-time-code"
              />
            ))}
          </div>
        </div>
        <div className='w-full h-1/4 flex justify-center items-center'>
          <button 
            type="submit" 
            className='w-20 sm:w-24 py-2 text-white font-semibold text-xs sm:text-sm bg-gradient-to-b from-[#5A5A5A] to-[#000000] hover:to-[#000000bc] rounded-xl popup-button-shadow'
          >
            Submit OTP
          </button>
        </div>
      </div>
    </div>
  );
}
