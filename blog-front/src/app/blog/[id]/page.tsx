"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';

const dummyBlog = {
  title: 'First Blog Post',
  author: 'Alice',
  content: 'This is a dummy blog post for demonstration. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.',
  date: '2025-08-28',
  image: '/vercel.svg',
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center   py-12 px-2">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-4">
        <img src={dummyBlog.image} alt={dummyBlog.title} className="w-full h-64 object-cover rounded" />
        <h2 className="text-3xl font-bold mb-2">{dummyBlog.title}</h2>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{dummyBlog.date}</span>
          <span>By {dummyBlog.author}</span>
        </div>
        <p className="text-gray-800 mb-4">{dummyBlog.content}</p>
        <hr />
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <form onSubmit={handleComment} className="flex gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add</button>
        </form>
        <div className="flex flex-col gap-2">
          {comments.length === 0 && <span className="text-gray-400">No comments yet.</span>}
          {comments.map((c, i) => (
            <div key={i} className="bg-gray-100 rounded p-2 text-gray-800">{c}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
