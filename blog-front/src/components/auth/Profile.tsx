import React from "react";
import toast from "react-hot-toast";

interface ProfileProps {
  name: string;
  email: string;
  onLogout: () => void;
}


import Link from "next/link";

const Profile: React.FC<ProfileProps> = ({ name, email, onLogout }) => {
  return (
    <div className="p-6 text-center relative">
      <Link href="/blog/add">
        <button className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">Add Blog</button>
      </Link>
      <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl mb-2">
        👤
      </div>
      <div className="font-semibold text-lg">{name}</div>
      <div className="text-gray-500 text-sm mb-4">{email}</div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => {
          onLogout();
          toast.success("Logged out successfully");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
