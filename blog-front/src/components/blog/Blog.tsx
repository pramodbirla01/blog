"use client";
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { getAllBlogs } from '@/api/blog';

function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err: any) {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading blogs...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-5 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          title={blog.title}
          author={blog.author?.name || 'Unknown'}
          date={blog.createdAt ? blog.createdAt.slice(0, 10) : ''}
          image={blog.imageUrl || '/vercel.svg'}
          content={blog.content}
        />
      ))}
    </div>
  );
}

export default Blog;