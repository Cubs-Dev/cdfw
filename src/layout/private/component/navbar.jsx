import React from "react";
import { Link } from "react-router-dom";
import { Menu, LogIn } from "lucide-react";

const Navbar = ({ setIsMenuOpen }) => {
  return (
    <div className="bg-indigo-900 h-[4rem] w-full flex justify-between items-center px-5 border-b border-white" dir="rtl">
      {/* Menu */}
      <button className="text-white " onClick={() => setIsMenuOpen(prevState => !prevState)}>
        <Menu />
      </button>

      {/* Titre */}
      <div className="flex items-center text-white text-2xl">
        <h1> فضاء الإدارة</h1>
      </div>
      
      {/* Bouton de connexion */}
      <Link to="/login" className="flex items-center h-[3rem] px-4 border-2 border-white bg-black rounded-full text-white">
        <LogIn className="ml-2" /> تسجيل الدخول
      </Link>
    </div>
  );
};

export default Navbar;
