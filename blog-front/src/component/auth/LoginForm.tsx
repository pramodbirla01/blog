"use client";
import React, { useState } from 'react';

const LoginForm = ({ onOtpClick }: { onOtpClick: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert('Logged in!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border-r-4 border-b-4 border-amber-600 rounded-xl bg-white w-80 mx-auto shadow-md">
      <h2 className="text-xl font-bold text-amber-900 mb-2">Login</h2>
      <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="border border-amber-300 p-2 rounded-lg focus:border-amber-600 focus:outline-none" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border border-amber-300 p-2 rounded-lg focus:border-amber-600 focus:outline-none" required />
      <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg font-semibold transition-colors">Login</button>
      <button type="button" className="bg-amber-900 hover:bg-amber-800 text-white p-2 rounded-lg font-semibold transition-colors" onClick={onOtpClick}>Login with OTP</button>
    </form>
  );
};

export default LoginForm;
