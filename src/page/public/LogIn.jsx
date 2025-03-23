import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/auth/authSlice";
import { LogIn } from "lucide-react";
import logo from '../../assets/lgo.png';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, userRole } = useSelector((state) => state.auth);

  const [idscout, setIdscout] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ idscout, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Vérifiez si le rôle est "admin" ou "rbr", sinon déconnectez l'utilisateur
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "rbr") {
        navigate("/rbr");
      } else {
        // Si le rôle n'est ni "admin" ni "rbr", déconnectez l'utilisateur
        alert("Votre rôle n'est pas autorisé à se connecter.");
        dispatch(logout()); // Déconnecter l'utilisateur
        navigate("/"); // Redirection vers la page de connexion
      }
    }
  }, [isAuthenticated, userRole, navigate, dispatch]);

  return (
    <div className="flex flex-col items-center bg-indigo-900 min-h-screen p-5">
      <div className="w-full flex items-center justify-start text-white text-3xl md:text-4xl font-bold mb-8">
        <LogIn className="w-12 h-12 md:w-16 md:h-16 mr-3" />
        <h1>Se connecter</h1>
      </div>

      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl">
        <div className="hidden md:flex justify-center items-center w-1/2 animate-pulse">
          <img src={logo} className="h-60 w-60" alt="Logo" />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 max-w-md">
          <form onSubmit={handleLogin} className="flex flex-col">
            <label className="text-indigo-900 text-lg font-semibold mb-2">
              Entrez votre identifiant scout :
            </label>
            <input
              type="number"
              placeholder="ID Scout"
              className="bg-gray-100 rounded-lg text-lg p-3 mb-4 border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              value={idscout}
              onChange={(e) => setIdscout(e.target.value)}
              required
            />

            <label className="text-indigo-900 text-lg font-semibold mb-2">
              Entrez votre mot de passe :
            </label>
            <input
              type="password"
              placeholder="Mot de passe"
              className="bg-gray-100 rounded-lg text-lg p-3 mb-4 border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
              <button
                type="submit"
                className="flex items-center bg-indigo-900 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
                disabled={loading}
              >
                <LogIn className="mr-2" />
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
