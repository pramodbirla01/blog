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
    <div className="min-h-screen bg-amber-100 flex items-center justify-center py-12 px-2">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border-r-4 border-b-4 border-amber-600 shadow-xl p-10 w-full max-w-lg flex flex-col gap-5">
        <h2 className="text-3xl font-extrabold mb-2 text-amber-900">Create New Blog</h2>
        <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} className="border border-amber-300 p-3 rounded-lg focus:border-amber-600 focus:outline-none text-amber-900 font-medium" required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} className="border border-amber-300 p-3 rounded-lg min-h-[120px] focus:border-amber-600 focus:outline-none text-amber-900 font-medium" required />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border border-amber-300 p-3 rounded-lg bg-white focus:border-amber-600 focus:outline-none"
        />
        <div className="w-full h-48 flex items-center justify-center bg-amber-50 rounded-lg border-2 border-amber-400 shadow-inner overflow-hidden mb-2">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg transition-transform duration-200 hover:scale-105 shadow-md border-none"
              style={{ background: '#fff' }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-amber-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v8.25M3 16.5l4.5-4.5a2.121 2.121 0 013 0l2.25 2.25 5.25-5.25a2.121 2.121 0 013 0L21 16.5M3 16.5V18A2.25 2.25 0 005.25 20h13.5A2.25 2.25 0 0021 18v-1.5" />
              </svg>
              <span className="text-amber-400 font-medium">No image selected</span>
            </div>
          )}
        </div>
        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg font-bold shadow transition-colors border-b-2 border-r-2 border-amber-900">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
