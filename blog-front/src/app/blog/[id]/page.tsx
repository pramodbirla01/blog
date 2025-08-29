import React from 'react';
import Image from 'next/image';
import { getBlogById } from '@/api/blog/[id]';

interface BlogDetailPageProps {
  params: { id: string };
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  let blog = null;
  try {
    blog = await getBlogById(params.id);
  } catch (e) {
    return <div className="p-8 text-center text-red-500">Blog not found.</div>;
  }
  if (!blog) return <div className="p-8 text-center">Blog not found.</div>;
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <div className="relative w-full aspect-[4/3] mb-4">
        <Image src={blog.imageUrl || '/vercel.svg'} alt={blog.title} fill className="rounded object-cover" sizes="(max-width: 768px) 100vw, 600px" />
      </div>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <div className="text-gray-500 text-sm mb-4">By {blog.author?.name || 'Unknown'} on {blog.createdAt ? blog.createdAt.slice(0, 10) : ''}</div>
      <div className="text-gray-800 text-base whitespace-pre-line">{blog.content}</div>
    </div>
  );
};

export default BlogDetailPage;