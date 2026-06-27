import React from 'react'
import { useNavigate } from 'react-router-dom'
import Questions from './../../composants/Questions'

const Accueil = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  const VerificationToken = () => {
    if (token) {
      navigate('/ajouter_question')
    } else {
      navigate('/connexion')
    }
  }

  return (
    <div className="w-full">

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto"><br />

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Bienvenue sur <span className="text-yellow-300">Mini Stack Overflow</span>
          </h1>

          <p className="text-white mb-8 text-sm sm:">
            Posez vos questions, partagez vos connaissances et connectez-vous avec d'autres développeurs.
          </p>

          <button
            onClick={VerificationToken}
            className="flex items-center justify-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Poser une question
          </button>

        </div>
      </div>

      {/* Liste des questions */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Questions />
      </div>

    </div>
  )
}

export default Accueil