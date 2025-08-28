"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type BlogCardProps = {
  title: string;
  author: string;
  content: string;
  date: string;
  image: string;
  id?: string | number;
};

const BlogCard = ({ title, author, content, date, image, id }: BlogCardProps) => {
  const router = useRouter();
  return (
    <div
      className="bg-white border-r-4 border-b-4  border-amber-600 rounded-xl  overflow-hidden flex flex-col  cursor-pointer  transition-transform hover:-translate-y-1  duration-200"
      onClick={() => router.push(`/blog/${id ?? 1}`)}
      title={title}
    >
      <div className="relative w-full h-44">
        <Image src={image} alt={title} fill className="object-cover border-t-4 border-l-4 border-b-4 border-amber-900 rounded-xl" />
      </div>
      <div className="flex flex-col p-6 flex-1">
        <h3 className="text-lg font-bold mb-1 text-gray-900 truncate">{title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{date}</span>
          <span className="font-semibold">{author}</span>
        </div>
        <p className="text-gray-800 line-clamp-3 mb-2 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default BlogCard;
