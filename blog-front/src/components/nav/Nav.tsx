"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthContent from "../auth/AuthContent";
import Profile from "../auth/Profile";
import { useAuth } from "@/context/AuthContext";
import { logout as logoutApi } from "@/api/auth";

const Nav: React.FC = () => {

  const [authOpen, setAuthOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();


  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowProfile(true);
      setAuthOpen(false);
    } else {
      setAuthOpen(true);
      setShowProfile(false);
    }
  };

  const handleLogout = async () => {
    await logoutApi();
    setIsLoggedIn(false);
    setUser(null);
    setShowProfile(false);
    setAuthOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <span
        className="font-extrabold text-2xl cursor-pointer select-none"
        onClick={() => router.push("/")}
      >
        Birla Blogs
      </span>
      <div>
        <button
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl hover:bg-gray-300"
          onClick={handleProfileClick}
        >
          👤
        </button>
      </div>
      {/* Auth modal for login/register/otp */}
      <AuthContent
        open={authOpen && !isLoggedIn}
        onClose={() => setAuthOpen(false)}
        isLoggedIn={isLoggedIn}
        user={user || undefined}
        onLogout={handleLogout}
      />
      {/* Profile modal */}
      {showProfile && isLoggedIn && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowProfile(false)}
            >
              &times;
            </button>
            <Profile name={user.name} email={user.email} onLogout={handleLogout} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;