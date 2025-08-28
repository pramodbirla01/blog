"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateBlogPage = () => {
  const [form, setForm] = useState({ title: '', content: '', image: null as File | null });
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === 'image' && files && files[0]) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle blog creation logic
    alert('Blog created!');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-pink-400 to-purple-500 py-12 px-2">
      <form onSubmit={handleSubmit} className="bg-white/95 rounded-2xl shadow-2xl p-10 w-full max-w-lg flex flex-col gap-5 border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Create New Blog</h2>
        <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium" required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} className="border border-gray-300 p-3 rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium" required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="border border-gray-300 p-3 rounded-lg bg-white" />
        {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />}
        <button type="submit" className="bg-gradient-to-r from-blue-600 to-pink-500 text-white p-3 rounded-lg font-bold shadow hover:from-blue-700 hover:to-pink-600 transition">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
