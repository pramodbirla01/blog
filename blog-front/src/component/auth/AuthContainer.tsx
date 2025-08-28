"use client";
import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import OtpLoginForm from './OtpLoginForm';

const AuthContainer = () => {
  const [view, setView] = useState<'login' | 'register' | 'otp'>('login');

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setView('login')} className={`p-2 rounded ${view === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Login</button>
        <button onClick={() => setView('register')} className={`p-2 rounded ${view === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Register</button>
      </div>
      {view === 'login' && <LoginForm onOtpClick={() => setView('otp')} />}
      {view === 'register' && <RegisterForm />}
      {view === 'otp' && <OtpLoginForm />}
    </div>
  );
};

export default AuthContainer;
