"use client";
import React, { useState, useRef, useEffect } from 'react';
import AuthContainer from '../auth/AuthContainer';

import { useRouter, usePathname } from 'next/navigation';

const Nav = () => {
  const [showAuth, setShowAuth] = useState(false);
  // Remove showBlogForm state, not needed for page navigation
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // TODO: Replace with real auth logic
  const isLoggedIn = true;
  const pathname = usePathname();

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
    <>
      <nav className="flex items-center  border-black justify-between px-8 py-4 bg-amber-950  shadow-lg relative z-10">
        <div className="font-bold text-4xl  cursor-pointer uppercase" onClick={() => router.push('/')}>BIRLA BLOGS</div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 shadow transition-all border-b-4 border-amber-200 focus:outline-none"
              title={pathname === '/create-blog' ? 'Back to Blogs' : 'Add Blog'}
              onClick={() => {
                if (pathname === '/create-blog') {
                  router.push('/');
                } else {
                  router.push('/create-blog');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="hidden sm:inline font-semibold">
                {pathname === '/create-blog' ? 'Back to Blogs' : 'Add Blog'}
              </span>
            </button>
          )}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-2 rounded-full hover:bg-white/20 focus:outline-none border border-white/20"
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
  {/* Blog Form Modal removed, navigation only */}
    </>
  );
};

export default Nav;
