import React from 'react';
import BlogList from './BlogList';

const Blog = () => {
  return (
    <div className="w-full min-h-screen py-12 px-4  flex justify-center items-start">
      <div className="w-full ">
        <BlogList />
      </div>
    </div>
  );
};

export default Blog;
