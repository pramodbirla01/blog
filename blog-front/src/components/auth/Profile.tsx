import React from "react";

interface ProfileProps {
  name: string;
  email: string;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ name, email, onLogout }) => {
  return (
    <div className="p-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl mb-2">
        👤
      </div>
      <div className="font-semibold text-lg">{name}</div>
      <div className="text-gray-500 text-sm mb-4">{email}</div>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
