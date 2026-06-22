import  React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const Deconnexion = () => {
    localStorage.removeItem("token");
    toast('deconnexion reussie');
    navigate('/');
    setMenuOpen(false);
  }

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium ${
      isActive ? 'text-blue-500' : 'text-gray-700 hover:text-gray-900'
    }`

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">

        <div className="text-white text-lg font-bold"></div>

        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-4 justify-between h-16"
        >
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-slate-200">
            <span className="text-lg font-bold"></span>
          </div>

          <span className="font-extrabold text-xl text-slate-900 tracking-tight">
            Fatima
            <span className="text-blue-600">Dev</span>
          </span>
        </NavLink>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClasses}>Accueil</NavLink>
          <NavLink to="/Profil" className={linkClasses}>Profil</NavLink>

          <div className="hidden md:flex items-center gap-2">

            {token ? (
              <button
                onClick={Deconnexion}
                className="bg-red-600 text-white px-6 py-1 rounded font-bold hover:bg-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Déconnecter
              </button>
            ) : (
              <>
                <NavLink
                  to="/connexion"
                  className="bg-blue-600 text-white px-6 py-1 rounded font-bold hover:bg-blue-700"
                >
                  connexion
                </NavLink>

                <NavLink
                  to="/inscription"
                  className="bg-green-600 text-white px-6 py-1 rounded font-bold hover:bg-green-700"
                >
                  inscription
                </NavLink>
              </>
            )}

          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
