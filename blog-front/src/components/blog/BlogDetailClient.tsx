"use client";
import React, { useState } from "react";
import CommentList from "./CommentList";
import { getBlogById } from '@/api/blog/[id]';
import toast from 'react-hot-toast';

interface BlogDetailClientProps {
  blog: any;
}

const BlogDetailClient: React.FC<BlogDetailClientProps> = ({ blog }) => {
  const [comments, setComments] = useState(blog.comments || []);
  const [refreshing, setRefreshing] = useState(false);

  const handleCommentAdded = async (isDelete?: boolean) => {
    setRefreshing(true);
    try {
      const updated = await getBlogById(blog.id);
      setComments(updated.comments || []);
      if (isDelete) {
        toast.success('Comment deleted');
      } else {
        toast.success('Comment added!');
      }
    } catch {
      // Optionally handle error
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <div className="text-gray-800 text-base whitespace-pre-line mb-8">{blog.content}</div>
      <CommentList blogId={blog.id} comments={comments} onCommentAdded={handleCommentAdded} />
      {refreshing && <div className="text-center text-xs text-gray-400 mt-2">Refreshing comments...</div>}
    </>
  );
};

export default BlogDetailClient;