import React, { useState } from "react";
import { Link } from "react-router-dom";
import { House, Contact, Newspaper, Menu, LogIn } from "lucide-react";
import Sidebar from "./Sidebar"; // Import Sidebar

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-indigo-900 h-[5rem] w-full flex justify-between items-center px-5 border-b border-white" dir="rtl">
        {/* Menu */}
        <button className="text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </button>

        {/* Bouton de connexion */}
        <Link to="/login" className="flex items-center h-[3rem] px-4 border-2 border-white bg-black rounded-full text-white">
          <LogIn className="ml-2" /> تسجيل الدخول
        </Link>
      </div>

      {/* Sidebar - Affiché quand isMenuOpen est true */}
      {isMenuOpen && <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};

export default Navbar;
