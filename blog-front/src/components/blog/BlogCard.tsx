"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BlogCardProps {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, author, date, image, content }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white rounded-lg shadow-md border border-amber-200 cursor-pointer hover:shadow-lg transition flex flex-col h-full"
      onClick={() => router.push(`/blog/${id}`)}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="rounded-t-lg object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0 p-4">
        <h2 className="font-bold text-lg line-clamp-1 mb-1">{title}</h2>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">{date}</span>
          <span className="text-xs text-gray-500">By {author}</span>
        </div>
        <p className="text-gray-700 text-sm line-clamp-2 flex-1">{content}</p>
      </div>
    </div>
  );
};

export default BlogCard;