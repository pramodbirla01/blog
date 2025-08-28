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
        <button
          onClick={() => setView('login')}
          className={`p-2 px-6 rounded-lg font-semibold border-b-4 border-r-4 transition-colors duration-150  ${view === 'login' ? 'bg-amber-600 border-amber-700 text-white shadow' : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-50'}`}
        >
          Login
        </button>
        <button
          onClick={() => setView('register')}
          className={`p-2 px-6 rounded-lg font-semibold border-b-4 border-r-4 transition-colors duration-150  ${view === 'register' ? 'bg-amber-600 border-amber-700 text-white shadow' : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-50'}`}
        >
          Register
        </button>
      </div>
      {view === 'login' && <LoginForm onOtpClick={() => setView('otp')} />}
      {view === 'register' && <RegisterForm />}
      {view === 'otp' && <OtpLoginForm />}
    </div>
  );
};

export default AuthContainer;
