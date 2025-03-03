import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';

const PrivateLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar en haut */}
      <header className="w-full">
        <Navbar setIsMenuOpen={setIsMenuOpen} />
      </header>

      {/* Contenu principal + Sidebar */}
      <main className="flex">
        {/* Zone principale prend tout l’espace restant */}
        <div className="flex-grow w-full p-4">
          <Outlet />
        </div>

        {/* Sidebar, affiché seulement si isMenuOpen est true */}
        {isMenuOpen && (
          <div className="w-64 md:w-1/4">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        )}
      </main>
    </div>
  );
};

export default PrivateLayout;
