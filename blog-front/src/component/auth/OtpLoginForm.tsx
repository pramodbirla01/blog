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
    <div className="flex flex-col gap-4 p-6 border-r-4 border-b-4 border-amber-600 rounded-xl bg-white w-80 mx-auto shadow-md">
      <h2 className="text-xl font-bold text-amber-900 mb-2">Login with OTP</h2>
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
          <input name="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border border-amber-300 p-2 rounded-lg focus:border-amber-600 focus:outline-none" required />
          <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg font-semibold transition-colors">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
          <input name="otp" type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} className="border border-amber-300 p-2 rounded-lg focus:border-amber-600 focus:outline-none" required />
          <button type="submit" className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-lg font-semibold transition-colors">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default OtpLoginForm;
