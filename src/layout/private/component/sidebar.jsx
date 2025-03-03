import React from "react";
import { X, House, Contact, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion
import logo from "../../../assets/lgo.png";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.div
      className="fixed top-0 right-0 h-screen w-auto md:w-1/4 bg-indigo-900 text-white p-4 shadow-lg"
      dir="rtl"
      initial={{ x: "100%" }} // Sidebar démarre hors écran
      animate={{ x: isMenuOpen ? 0 : "100%" }} // Animation entrée/sortie
      transition={{ type: "spring", stiffness: 300, damping: 30 }} // Animation fluide
    >
      {/* Bouton de fermeture */}
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-4 left-4 text-white hover:text-red-400 transition md:hidden"
      >
        <X size={24} />
      </button>

      {/* Logo */}
      <div className="flex flex-col items-center gap-2 p-2">
        <motion.img
          src={logo}
          alt="CUBS DEVELOPMENT"
          className="h-[5rem] md:h-[6rem]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.span
          className="text-lg md:text-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          مرحبا بك معنا
        </motion.span>
      </div>

      {/* Liens de navigation */}
      <nav className="mt-6 flex flex-col gap-4 items-start pl-4">
        {[
          { to: "/", icon: <House />, label: "الرئيسية", delay: 0.4 },
          { to: "/contact", icon: <Contact />, label: "اتصل بنا", delay: 0.6 },
          { to: "/blog", icon: <Newspaper />, label: "الأخبار", delay: 0.8 },
        ].map(({ to, icon, label, delay }) => (
          <motion.div
            key={to}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
          >
            <Link
              to={to}
              className="flex items-center gap-3 text-white hover:text-indigo-400 transition duration-300 transform hover:scale-105"
            >
              {icon} <span>{label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
