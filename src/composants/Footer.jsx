import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16 py-10">
      <div className="container mx-auto px-6">

        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MS</span>
              </div>

              <span className="font-extrabold text-xl text-white tracking-tight">
                Mini Stack
                <span className="text-blue-500">Overflow</span>
              </span>
            </div>

            <p className="text-gray-400 text-sm">
              Mini Stack Overflow est une plateforme où les développeurs peuvent
              poser des questions techniques, partager leurs connaissances et
              aider la communauté grâce aux réponses et aux votes.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              {[
                {
                  label: 'Github',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Twitter',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.062-1.867-3.062s-2.154 1.459-2.154 2.965v5.701h-3v-10h2.881v1.367h.041c.401-.762 1.381-1.566 2.846-1.566 3.042 0 3.603 2.004 3.603 4.604v5.595z"/>
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>

            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-gray-400 hover:text-white">
                  Accueil
                </NavLink>
              </li>

              <li>
                <NavLink to="/profil" className="text-gray-400 hover:text-white">
                  Mon profil
                </NavLink>
              </li>

              <li>
                <NavLink to="/ajouter_question" className="text-gray-400 hover:text-white">
                  Ajouter une question
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compte</h3>

            <ul className="space-y-2">
              <li>
                <NavLink to="/connexion" className="text-gray-400 hover:text-white">
                  Connexion
                </NavLink>
              </li>

              <li>
                <NavLink to="/inscription" className="text-gray-400 hover:text-white">
                  Inscription
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <ul className="space-y-3 text-gray-400">
              <li>📧 contact@ministackoverflow.com</li>
              <li>📍 Dakar, Sénégal</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {year}{' '}
            <span className="font-semibold text-white">
              Mini Stack Overflow
            </span>
            . Tous droits réservés.
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Développé au Sénégal 🇸🇳
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer