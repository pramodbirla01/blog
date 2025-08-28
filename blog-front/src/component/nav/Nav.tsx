"use client";
import React, { useState, useRef, useEffect } from 'react';
import AuthContainer from '../auth/AuthContainer';

import { useRouter } from 'next/navigation';

const Nav = () => {
  const [showAuth, setShowAuth] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // TODO: Replace with real auth logic
  const isLoggedIn = true;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAuth(false);
      }
    }
    if (showAuth) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAuth]);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white relative">
      <div className="font-bold text-lg">My Blog</div>
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <button
            className="flex items-center gap-1 p-2 rounded-full hover:bg-blue-600 focus:outline-none"
            title="Add Blog"
            onClick={() => router.push('/create-blog')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 focus:outline-none"
            onClick={() => setShowAuth((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
            </svg>
          </button>
          {showAuth && (
            <div className="absolute right-0 mt-2 w-96 bg-white text-black rounded shadow-lg z-50 p-4">
              <AuthContainer />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
