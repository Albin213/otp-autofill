"use client"; // Mark this as a client component

import { useRouter } from 'next/navigation'; // useRouter is replaced by next/navigation in the App Directory

export default function Home() {
  const router = useRouter();

  const handleOtpPage = () => {
    router.push('/otp');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleOtpPage}
        className="bg-blue-600 text-white p-3 rounded-md text-lg"
      >
        Enter OTP
      </button>
    </div>
  );
}
