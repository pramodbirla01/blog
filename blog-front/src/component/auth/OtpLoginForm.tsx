"use client";
import React, { useState } from 'react';

const OtpLoginForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Send OTP logic here
    setStep(2);
    alert('OTP sent!');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify OTP logic here
    alert('Logged in with OTP!');
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md w-80 mx-auto">
      <h2 className="text-xl font-bold">Login with OTP</h2>
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <input name="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" required />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
          <input name="otp" type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} className="border p-2 rounded" required />
          <button type="submit" className="bg-green-600 text-white p-2 rounded">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default OtpLoginForm;
