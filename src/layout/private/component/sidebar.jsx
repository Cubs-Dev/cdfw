import React, { useState, useEffect } from "react";
import { X, Contact, Newspaper, Facebook, Instagram, LandPlot, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../assets/lgo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false); // nouveau
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const roleBasedNavItems = {
    admin: [
      { to: "/admin/amofawadhiya", icon: <LandPlot size={20} />, label: "قائمة المفوضيّات", delay: 0.4 },
      { to: "/admin/aobjectif", icon: <Contact />, label: "قائمة الأهداف", delay: 0.5 },
      { to: "/admin/stats", icon: <Newspaper />, label: "الإحصائيات", delay: 0.6 },
    ],
    rbr: [
      { to: "/rbr/leaders", icon: <LandPlot size={20} />, label: "ALA", delay: 0.4 },
      { to: "/rbr/tasks", icon: <Newspaper />, label: "المهام", delay: 0.5 },
    ],
    leader: [
      { to: "/leader/team", icon: <LandPlot size={20} />, label: "فريق العمل", delay: 0.4 },
      { to: "/leader/reports", icon: <Newspaper />, label: "التقارير", delay: 0.5 },
    ],
    default: [],
  };

  const navItems = roleBasedNavItems[user?.role] || roleBasedNavItems.default;

  return (
    <motion.div
      className="fixed top-0 right-0 h-screen w-auto bg-indigo-900 text-white p-4 shadow-lg flex flex-col justify-between"
      dir="rtl"
      initial={{ x: "100%" }}
      animate={{ x: isMenuOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {isMobile && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 left-4 text-white hover:text-red-400 transition md:hidden"
        >
          <X size={24} />
        </button>
      )}

      {/* Partie supérieure */}
      <div className="flex flex-col items-center gap-4">
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

        <nav className="flex flex-col gap-4 items-center p-3 text-sm w-full">
          {/* Premier dropdown */}
          <div className="w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center w-full justify-between text-white hover:text-indigo-800 hover:bg-yellow-200 transition duration-300 transform hover:scale-105 rounded-full p-2 border-r-8 border-b-2 border-yellow-500"
            >
              <div className="flex items-center gap-2">
                <LandPlot />
                <span>فضاء المفوّضيات</span>
              </div>
              <ChevronDown />
            </button>

            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: isDropdownOpen ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-lg shadow-lg w-full mt-2 p-2">
                {navItems?.map((item, index) => (
                  <NavItem key={index} to={item.to} icon={item.icon} label={item.label} delay={item.delay} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Deuxième dropdown */}
          <div className="w-full">
            <button
              onClick={() => setIsSecondDropdownOpen(!isSecondDropdownOpen)}
              className="flex items-center w-full justify-between text-white hover:text-indigo-800 hover:bg-yellow-200 transition duration-300 transform hover:scale-105 rounded-full p-2 border-r-8 border-b-2 border-yellow-500"
            >
              <div className="flex items-center gap-2">
                <ChevronRight />
                <span>قائمة إضافية</span>
              </div>
              <ChevronDown />
            </button>

            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: isSecondDropdownOpen ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-lg shadow-lg w-full mt-2 p-2">
                <NavItem to="/admin/eprofil" icon={<Contact />} label="خيار إضافي" delay={0.7} />
              </div>
            </motion.div>
          </div>

        </nav>
      </div>

      {/* Partie inférieure */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center gap-5">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={30} className="text-white hover:text-gray-600 transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={30} className="text-white hover:text-blue-400 transition" />
          </a>
        </div>
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
        onClick={onClick}
      >
        {icon} <span>{label}</span>
      </Link>
    </motion.div>
  );
};

export default Sidebar;
