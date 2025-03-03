import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';

const PrivateLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar en haut */}
      <header className="w-full">
        <Navbar setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* Contenu principal + Sidebar */}
      <main className="flex flex-grow">
        {/* Zone principale, s'ajuste selon la sidebar */}
        <div className="w-3/4">
          <Outlet />
        </div>

        {/* Sidebar, visible seulement si isMenuOpen est true */}
        <div className="w-1/4">
          <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
