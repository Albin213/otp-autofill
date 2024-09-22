// "use client";

// import { useEffect } from 'react';

// export default function OtpPage() {
//   useEffect(() => {
//     if ('OTPCredential' in window) {
//       const input = document.querySelector('input[autocomplete="one-time-code"]');
//       if (!input) return;

//       const ac = new AbortController();
//       const form = input.closest('form');
      
//       // Remove the abort action from form submission initially
//       // Just prevent default action
//       form.addEventListener('submit', e => {
//         e.preventDefault(); // Prevent the default form submission
//       });

//       // Invoke the Web OTP API
//       navigator.credentials.get({
//         otp: { transport: ['sms'] },
//         signal: ac.signal,
//       }).then(otp => {
//         if (otp) {
//           input.value = otp.code; // Autofill OTP
//           form.submit(); // Now submit the form after receiving OTP
//         }
//       }).catch(err => {
//         console.error('Error fetching OTP:', err); // Log any errors
//       });

//       // Optionally handle a manual submission case to abort
//       form.addEventListener('submit', () => {
//         ac.abort(); // Abort the OTP request if the form is submitted manually
//       });
//     } else {
//       console.warn('Web OTP API not supported in this browser.');
//     }
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         action="/api/verify-otp" // Backend route to verify OTP
//         method="POST"
//         className="bg-white p-6 rounded-md shadow-lg max-w-md w-full"
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
//         <input
//           type="text"
//           inputMode="numeric"
//           autoComplete="one-time-code"
//           pattern="\d{6}"
//           required
//           placeholder="Enter your OTP"
//           className="w-full border border-gray-300 rounded-md p-2 text-lg mb-4"
//         />
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white rounded-md p-2 text-lg"
//         >
//           Submit OTP
//         </button>
//       </form>
//     </div>
//   );
// }







"use client";

import { useEffect, useRef } from 'react';

export default function OtpPage() {
  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  const focusNext = (index, event) => {
    const value = event.target.value;

    // Handle backspace
    if (event.key === "Backspace" && index > 0 && value === "") {
      inputRefs[index - 1].current.focus();
    } else if (value !== "" && index < 5) {
      // Move to the next field
      inputRefs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    if ('OTPCredential' in window) {
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
          // Optionally submit the form here
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
          <div className='w-full pt-2 flex justify-center gap-2'>
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                className="text-center size-10 border-2 border-black rounded-lg w-12 h-12 text-xl"
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
