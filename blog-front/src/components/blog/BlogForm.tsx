"use client";
import React, { useState } from 'react';



import { createBlog } from '@/api/blog/add';
import { useRouter } from 'next/navigation';

const BlogForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			setImageFile(null);
			setImagePreview(null);
		}
	};

		const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			setLoading(true);
			try {
				await createBlog({ title, content, imageFile });
				router.push('/');
			} catch (err: any) {
				// Optionally handle error
			} finally {
				setLoading(false);
			}
		};

	return (
		<form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 mt-8">
			<h2 className="text-2xl font-bold mb-2">Add New Blog</h2>
			<input
				type="text"
				placeholder="Title"
				className="border rounded px-3 py-2"
				value={title}
				onChange={e => setTitle(e.target.value)}
				required
				disabled={loading}
			/>
			<textarea
				placeholder="Content"
				className="border rounded px-3 py-2 min-h-[120px]"
				value={content}
				onChange={e => setContent(e.target.value)}
				required
				disabled={loading}
			/>
			<div>
				<label className="block mb-1 font-medium">Upload Image</label>
				<input
					type="file"
					accept="image/*"
					className="border rounded px-3 py-2 w-full"
					onChange={handleImageChange}
					disabled={loading}
				/>
				{imagePreview && (
					<img src={imagePreview} alt="Preview" className="mt-2 rounded max-h-40 object-contain border" />
				)}
			</div>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" disabled={loading}>
				{loading ? 'Creating...' : 'Create Blog'}
			</button>
		</form>
	);
};

export default BlogForm;

