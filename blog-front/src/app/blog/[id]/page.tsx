import React from 'react';
import Image from 'next/image';
import { getBlogById } from '@/api/blog/[id]';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

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
    <div className="mx-auto bg-white rounded-lg shadow-md p-0 overflow-hidden max-w-3xl">
      {blog.imageUrl && (
        <div className="w-full h-90 relative">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
            priority
          />
        </div>
      )}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="text-gray-500 text-sm mb-4">By {blog.author?.name || 'Unknown'} on {blog.createdAt ? blog.createdAt.slice(0, 10) : ''}</div>
        <BlogDetailClient blog={blog} />
      </div>
    </div>
  );
};

export default BlogDetailPage;