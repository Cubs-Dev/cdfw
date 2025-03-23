import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";

const Navbar = ({ setIsMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer l'utilisateur depuis le store
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role; // Vérification sécurisée

  const handleLogout = () => {
    dispatch(logout ()); // Supprime l'utilisateur du store et du localStorage
    navigate("/"); // Redirige après la déconnexion
  };

  // Déterminer le titre en fonction du rôle
  const getTitle = () => {
    switch (userRole) {
      case "admin":
        return "فضاء الإدارة"; // Titre pour les administrateurs
      case "rbr":
        return "فضاء المفوّضية"; // Titre pour les scouts
      default:
        return "نظام إدارة المستخدمين"; // Titre par défaut
    }
  };

  return (
    <div className="bg-indigo-900 h-[4rem] w-full flex justify-between items-center px-5 border-b border-white" dir="rtl">
      {/* Menu */}
      <button className="text-white" onClick={() => setIsMenuOpen((prevState) => !prevState)}>
        <Menu />
      </button>

      {/* Titre basé sur le rôle */}
      <div className="flex items-center text-white text-2xl">
        <h1>{getTitle()}</h1>
      </div>

      {/* Affichage du nom de l'utilisateur ou bouton de connexion */}
      {user && user.nom && user.prenom ? (
        <div className="flex items-center space-x-4 text-white">
          {/* Bouton de déconnexion avec le nom de l'utilisateur */}
          <button
            onClick={handleLogout}
            className="flex items-center h-[3rem] px-4 border-2 border-white bg-black rounded-full text-white cursor-pointer hover:bg-red-600"
          >
            <LogOut className="ml-2" />
            {user.nom} {user.prenom}
          </button>
        </div>
      ) : (
        <Link to="/login" className="text-white">
          Se connecter
        </Link>
      )}
    </div>
  );
};

export default Navbar;
