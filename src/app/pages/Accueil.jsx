import React from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import Questions from './../../composants/Questions';



const Accueil = () => {
    const token = localStorage.getItem("token");
       const navigate = useNavigate();
   

    const  VerificationToken = () => {
        if(token) {
           return navigate('/ajouter_question');
        }
        navigate('/connexion')
    }


  return (
    <div className="w-full">
        {/*--Hero banner--*/}
        <div className="bg-gray-100 py-20 from-indigo-100 to-indigo-300">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Bienvenue sur <span className="text-indigo-600">Mini Stack Overflow</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Posez vos questions, partagez vos connaissances et connectez-vous avec d'autres développeurs.
                </p>
            </div>
            <button
                onClick={VerificationToken}
                className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition-colors duration-300"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Poser une question
            </button>
        </div>
        {/*--Liste des questions--*/}
         <Questions/>
         </div>
    
  )
}

export default Accueil
