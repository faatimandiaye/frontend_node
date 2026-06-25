import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">

       {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Brand */}

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MS</span>
              </div>
              <span className="font-extrabold text-xl text-white text-tracking-tight">
                Mini Stack
                <span className="text-blue-600">Overflow</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme de développement web et mobile pour tous vos besoins. Nous offrons des solutions innovantes &amp; personnalisées pour aider votre entreprise à prospérer dans le monde numérique.

           
            </p>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4">
              {[
                {
                  label: 'Github',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.848 8.207 11.628v-8.203h-2.58v-3.622h2.58v-2.697c0-2.67 1.594-4.191 4.097-4.191 1.163 0 2.287 .395 3.217 1.095l2.49 -2.39c-1.54-.947-3.345-1.507-5.307-1.507z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Twitter',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39 .045 .765 .127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424 .729-.666 1.577-.666 2.476 0 1.708 .87 3.216 2.188 4.099-.807-.026-1.566-.247-2.229-.616v"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75 .784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.062-1.867-3.062s-2.154 1.459-2.154 2.965v5.701h-3v-10h2.881v1.367h .041c .401-.762 1.381-1.566 2.846-1.566 3.042 0 3.603 2 .4036 4z"/>
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {icon}
                </button>
              ))}
          </div>
            </div>
          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Accueil' },
                { to: '/Profil', label: 'Mon profil' },
                { to: '/ajouter_question', label: 'Ajouter une question' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink 
                  to={to} 
                  className="text-gray-400 hover:text-white transition-colors duration-300">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* compte */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Compte</h3>
            <ul className="space-y-2">
              {[
                { to: '/connexion', label: 'Connexion' },
                { to: '/inscription', label: 'Inscription' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink 
                  to={to} 
                  className="text-gray-400 hover:text-white transition-colors duration-300">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12.713l-11.989 8.573 11.989-3.404 11.989 3.404-11.989-8.573zm0-3.404l-11.989-8.573 11.989 3.404 11.989-3.404-11.989 8.573z"/>

                </svg>
                  contact@votresite.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-1.977 1.977a1 1 0 01-1.414.054L2.036 8.65a1 1 0 01-.366-.79l.366-3.78z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5a2 2 0 012-2h2a2 2 0 012 2v5a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z"/>
                </svg>
                Dakar, Sénégal
              </li>
            </ul>
          </div>
        </div>

        {/*--Separateur + Copyright--*/}
        <div className="mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
          <p className="text-slate-400 text-sm">
            {year}{''}
            <span className="text-gray-400 fron-semibold">faDev</span>. 
            Tous droits réservés.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-gray-400 fron-semibold">faDev</span>
            <span >au senegal</span>
          </div>
        </div>
      </div>

    </footer>
 
  )
}

export default Footer
