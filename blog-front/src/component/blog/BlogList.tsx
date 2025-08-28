import React from 'react';
import BlogCard from './BlogCard';


const dummyBlogs = [
  {
    id: 1,
    title: 'First Blog Post',
    author: 'Alice',
    content: 'This is a dummy blog post for demonstration. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.',
    date: '2025-08-28',
    image: '/vercel.svg',
  },
  {
    id: 2,
    title: 'Second Blog Post',
    author: 'Bob',
    content: 'Another example of a blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur.',
    date: '2025-08-27',
    image: '/next.svg',
  },
];

const BlogList = () => {
  return (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 py-6">
      {dummyBlogs.map((blog) => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
};

export default BlogList;
