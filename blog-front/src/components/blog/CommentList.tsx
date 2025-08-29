"use client";
import React, { useState } from "react";
import { addComment } from "@/api/comment/add";
import { useAuth } from "@/context/AuthContext";
import Loader from "../auth/Loader";
import { deleteComment } from '@/api/comment/delete';
import toast from 'react-hot-toast';

interface CommentListProps {
  blogId: string;
  comments: any[];
  onCommentAdded: (isDelete?: boolean) => void;
}

const CommentList: React.FC<CommentListProps> = ({ blogId, comments, onCommentAdded }) => {
  const { isLoggedIn, user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    try {
  await addComment({ blogId, content });
  setContent("");
  onCommentAdded(false);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
  await deleteComment(id);
  onCommentAdded(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Failed to delete comment');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="font-semibold text-lg mb-4">Comments</h3>
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            placeholder="Add a comment..."
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
            disabled={loading || !content.trim()}
          >
            {loading && <Loader size={16} />} Comment
          </button>
        </form>
      ) : (
        <div className="mb-6 text-gray-500">Login to add a comment.</div>
      )}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="space-y-4">
        {comments.length === 0 && <div className="text-gray-400">No comments yet.</div>}
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-50 rounded p-3 border flex items-start justify-between">
            <div>
              <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                {c.user?.name || "User"} <span className="text-xs text-gray-400">{c.createdAt ? c.createdAt.slice(0, 10) : ""}</span>
              </div>
              <div className="text-gray-800 text-base">{c.content}</div>
            </div>
            {isLoggedIn && user && c.user?.id === user.id && (
              <button
                title="Delete comment"
                className="ml-2 text-red-500 hover:text-red-700 text-lg disabled:opacity-50"
                onClick={() => handleDelete(c.id)}
                disabled={deleting === c.id}
              >
                {deleting === c.id ? <Loader size={16} /> : '🗑️'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
