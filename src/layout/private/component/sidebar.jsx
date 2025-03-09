import React, { useState, useEffect } from "react";
import { X, Contact, Newspaper, Facebook, Instagram, LandPlot, ChevronDown } from "lucide-react";  
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../assets/lgo.png";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Vérifie la taille de l'écran

  // Mettre à jour la valeur de `isMobile` lorsqu'on redimensionne la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="top-0 right-0 h-screen w-auto bg-indigo-900 text-white p-4 shadow-lg"
      dir="rtl"
      initial={{ x: "100%" }}
      animate={{ x: isMenuOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Bouton de fermeture (mobile uniquement) */}
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 left-4 text-white hover:text-red-400 transition md:hidden"
        >
          <X size={24} />
        </button>
      )}

      {/* Logo et texte d'accueil */}
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

      {/* Navigation */}
      <nav className="flex flex-col gap-2 items-center p-3 text-sm">
        {/* Bouton menu déroulant */}
        <div className="w-auto"> 
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center w-auto text-white hover:text-indigo-800 hover:bg-yellow-200 transition duration-300 transform hover:scale-105 rounded-full p-2 border-r-8 border-b-2 border-yellow-500"
          >
            <LandPlot /> <span>فضاء المفوّضيات</span> <ChevronDown />
          </button>

          {/* Menu déroulant */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: isDropdownOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-lg shadow-lg w-full mt-2 p-2">
              <NavItem to="/amofawadhiya" icon={<LandPlot size={20} />} label="قائمة المفوضيّات" delay={0.4} onClick={() => { if (isMobile) { setIsDropdownOpen(false); setIsMenuOpen(false); } }} />
              <NavItem to="/amofawadhiya/option2" icon={<LandPlot size={20} />} label="Option 2" delay={0.5} onClick={() => { if (isMobile) { setIsDropdownOpen(false); setIsMenuOpen(false); } }} />
              <NavItem to="/amofawadhiya/option3" icon={<LandPlot size={20} />} label="Option 3" delay={0.6} onClick={() => { if (isMobile) { setIsDropdownOpen(false); setIsMenuOpen(false); } }} />
            </div>
          </motion.div>
        </div>

        {/* Autres liens */}
        <NavItem to="/contact" icon={<Contact />} label="اتصل بنا" delay={0.6} onClick={() => isMobile && setIsMenuOpen(false)} />
        <NavItem to="/blog" icon={<Newspaper />} label="الأخبار" delay={0.8} onClick={() => isMobile && setIsMenuOpen(false)} />
      </nav>

      {/* Réseaux sociaux */}
      <div className="flex justify-center gap-5 mt-5">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram size={30} className="text-white hover:text-gray-600 transition" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook size={30} className="text-white hover:text-blue-400 transition" />
        </a>
      </div>
    </motion.div>
  );
};

const NavItem = ({ to, icon, label, delay, onClick }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="flex w-full items-center gap-3 text-white hover:text-indigo-800 hover:bg-yellow-200 transition duration-300 transform hover:scale-105 rounded-full p-2 border-r-8 border-b-2 border-yellow-500"
        onClick={onClick} // Ferme la Sidebar uniquement sur mobile
      >
        {icon} <span>{label}</span>
      </Link>
    </motion.div>
  );
};

export default Sidebar;
