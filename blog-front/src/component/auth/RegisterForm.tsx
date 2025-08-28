"use client";
import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    alert('Registered!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md w-80 mx-auto">
      <h2 className="text-xl font-bold">Register</h2>
      <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="border p-2 rounded" required />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default RegisterForm;
