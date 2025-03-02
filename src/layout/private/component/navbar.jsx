import React, { useState } from "react";
import { Link } from "react-router-dom";
import { House, Contact, Newspaper, Menu, LogIn } from "lucide-react";
import logo from "../../../assets/lgo.png";
import Sidebar from "./Sidebar"; // Import Sidebar

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-indigo-900 h-[5rem] w-full relative flex justify-between items-center border-b border-white px-5" dir="rtl">
        {/* Logo et menu */}
        <div className="flex items-center gap-4 flex-row-reverse relative">
          <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button>
        </div>

        {/* Bouton de connexion */}
        <Link to="/login" className="w-auto md:flex items-center h-[4rem] px-4 border-2 border-white bg-black rounded-full text-white flex-row-reverse">
          <LogIn className="ml-2" /> تسجيل الدخول
        </Link>
      </div>

      {/* Sidebar - Affiché quand isMenuOpen est true */}
      {isMenuOpen && <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};

export default Navbar;
