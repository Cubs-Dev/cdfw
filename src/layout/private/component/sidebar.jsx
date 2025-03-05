import React from "react";
import { X, House, Contact, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../assets/lgo.png";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.div
      className="top-0 right-0 h-screen w-auto bg-indigo-900 text-white p-4 shadow-lg"
      dir="rtl"
      initial={{ x: "100%" }}
      animate={{ x: isMenuOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <button
        onClick={() => setIsMenuOpen(false)}
        className="absolute top-4 left-4 text-white hover:text-red-400 transition md:hidden"
      >
        <X size={24} />
      </button>

      <div className="flex flex-col items-center gap-2 pb-5">
        <motion.img
          src={logo}
          alt="CUBS DEVELOPMENT"
          className="h-[5rem] md:h-[6rem]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.span
          className="text-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          مرحبا بك معنا
        </motion.span>
      </div>

      <nav className="flex flex-col gap-2 items-start p-3 text-sm ">
        <NavItem to="/" icon={<Contact />} label="فضاء المفوّضيات" delay={0.4} />
        <NavItem to="/contact" icon={<Contact />} label="اتصل بنا" delay={0.6} />
        <NavItem to="/blog" icon={<Newspaper />} label="الأخبار" delay={0.8} />
      </nav>
    </motion.div>
  );
};

const NavItem = ({ to, icon, label, delay }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="flex items-center gap-3 text-white hover:text-indigo-800 hover:bg-yellow-200 transition duration-300 transform hover:scale-105  rounded-full p-2 border-r-8 border-b-2 border-yellow-500"
      >
        {icon} <span>{label}</span>
      </Link>
    </motion.div>
  );
};

export default Sidebar;
