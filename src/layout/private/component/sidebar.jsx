import React from "react";
import { X, House, Contact, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";  // Importation de framer-motion
import logo from "../../../assets/lgo.png";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.div
      className="fixed top-0 right-0 h-screen w-[250px] bg-indigo-900 text-white p-4 shadow-lg"
      dir="rtl"
      initial={{ x: "100%" }}  // Initialisation: position hors écran
      animate={{ x: isMenuOpen ? 0 : "100%" }}  // Déplacement de la sidebar
      transition={{ type: "spring", stiffness: 300, damping: 30 }}  // Animation fluide avec un ressort
    >
      {/* Bouton pour fermer la Sidebar */}
      <motion.button
        className="absolute top-4 right-4 text-white"
        onClick={() => setIsMenuOpen(false)}
        whileHover={{ scale: 1.1 }}  // Légère mise à l'échelle au survol
        whileTap={{ scale: 0.95 }}  // Réduction au clic
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <X />
      </motion.button>

      {/* Logo avec animation */}
      <div className="flex flex-col items-center gap-2">
        <motion.img
          src={logo}
          alt="CUBS DEVELOPMENT"
          className="h-[4rem] w-[4rem]"
          initial={{ opacity: 0, scale: 0.8 }}  // Initialisation : invisible et petite taille
          animate={{ opacity: 1, scale: 1 }}  // Apparition et mise à l'échelle
          transition={{ duration: 0.5 }}  // Animation rapide
        />
        <motion.span
          className="text-xl"
          initial={{ opacity: 0, y: -10 }}  // Initialisation : invisible et décalé vers le haut
          animate={{ opacity: 1, y: 0 }}  // Apparition avec déplacement
          transition={{ duration: 0.5, delay: 0.2 }}  // Retard de 0.2s pour l'animation
        >
          مرحبا بك معنا
        </motion.span>
      </div>

      {/* Liens avec animation de survol */}
      <nav className="mt-6 flex flex-col gap-4 items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}  // Retard léger pour chaque lien
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-indigo-400 transition duration-300 transform hover:scale-105"
          >
            <House /> الرئيسية
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 text-white hover:text-indigo-400 transition duration-300 transform hover:scale-105"
          >
            <Contact /> اتصل بنا
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            to="/blog"
            className="flex items-center gap-2 text-white hover:text-indigo-400 transition duration-300 transform hover:scale-105"
          >
            <Newspaper /> الأخبار
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
