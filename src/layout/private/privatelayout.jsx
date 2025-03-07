import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Sidebar from './component/sidebar';

const PrivateLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex flex-col h-full">
      {/* Navbar at the top */}
      <header className="w-full">
        <Navbar setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* Main content + Sidebar */}
      <main className="flex h-full">
        {/* Main content area adjusts based on Sidebar state */}
        <div className={`h-full transition-all duration-300 ${isMenuOpen ? 'w-5/6' : 'w-full'}`}>
          <Outlet />
        </div>

        {/* Sidebar, only visible when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="absolute top-0 right-0 w-auto h-screen md:w-1/6">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        )}
      </main>
    </div>
  );
};

export default PrivateLayout;
