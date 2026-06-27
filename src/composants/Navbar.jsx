import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [menuOpen, setMenuOpen] = useState(false)

  const Deconnexion = () => {
    localStorage.removeItem('token')
    setToken(null)
    toast.success('Déconnexion réussie 👋')
    navigate('/')
    setMenuOpen(false)
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow duration-300">
              <span className="text-white font-bold text-sm">S</span>
            </div>

            <span className="font-bold text-slate-800 text-lg tracking-tight">
              Mini <span className="text-indigo-500">Stack Overflow</span>
            </span>
          </NavLink>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>
              Accueil
            </NavLink>

            <NavLink to="/ajouter_question" className={linkClass}>
              Poser une question
            </NavLink>

            <NavLink to="/profil" className={linkClass}>
              Profil
            </NavLink>
          </div>

          {/* Barre de recherche */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-64 px-4 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Boutons desktop */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <button
                onClick={Deconnexion}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Déconnecter
              </button>
            ) : (
              <>
                <NavLink
                  to="/connexion"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 transition-all duration-200"
                >
                  Connexion
                </NavLink>

                <NavLink
                  to="/inscription"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200"
                >
                  S'inscrire
                </NavLink>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-all duration-200"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 space-y-1">

          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-xl"
          >
            🏠 Accueil
          </NavLink>

          <NavLink
            to="/ajouter_question"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-xl"
          >
            ❓ Poser une question
          </NavLink>

          <NavLink
            to="/profil"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-xl"
          >
            👤 Profil
          </NavLink>

          <div className="border-t pt-3">

            {token ? (
              <button
                onClick={Deconnexion}
                className="w-full bg-red-500 text-white py-2 rounded-xl"
              >
                Déconnecter
              </button>
            ) : (
              <>
                <NavLink
                  to="/connexion"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 border rounded-xl mb-2"
                >
                  Connexion
                </NavLink>

                <NavLink
                  to="/inscription"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 rounded-xl bg-indigo-600 text-white"
                >
                  S'inscrire
                </NavLink>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar