import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex flex-grow">
        <div className="w-3/5">
          <Outlet />
        </div>
        <div className="w-2/5">
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default Layout;
