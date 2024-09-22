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

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController();

      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      }).then(otp => {
        if (otp) {
          alert(`Detected OTP: ${otp.code}`); // Alert the detected OTP
          
          // Fill each input field with the corresponding digit
          const otpDigits = otp.code.split('');
          otpDigits.forEach((digit, index) => {
            if (inputRefs[index].current) {
              inputRefs[index].current.value = digit;
            }
          });
        }
      }).catch(err => {
        console.error('Error fetching OTP:', err);
      });

      return () => {
        ac.abort(); // Clean up the abort controller
      };
    } else {
      console.warn('Web OTP API not supported in this browser.');
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <div className="w-full pt-2 flex justify-center gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              className="text-center border-2 border-gray-300 rounded-lg w-12 h-12"
              maxLength="1"
              type="tel"
              inputMode="numeric"
            />
          ))}
        </div>
        <button
          className="w-full bg-purple-600 text-white rounded-md p-2 text-lg mt-4"
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
}
