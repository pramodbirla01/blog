import React from 'react';
import BlogList from './BlogList';

const Blog = () => {
  return (
    <div className="w-full min-h-screen py-12 px-4 bg-gradient-to-br from-blue-500 via-pink-400 to-purple-500 flex justify-center items-start">
      <div className="w-full ">
        <BlogList />
      </div>
    </div>
  );
};

export default Blog;
