import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const API_URL= import.meta.env.VITE_API_URL

const Inscription = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [showPassword, setShowpassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const Register = async (e) => {
    e.preventDefault()

    if (!prenom || !nom || !email || !password) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    const toastId = toast.loading('Création du compte...')

    try {
      const response = await fetch(
        `${API_URL}/api/auth/inscription`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prenom,
            nom,
            email,
            password,
          }),
        }
      )

      const result = await response.json()

      if (response.ok) {
        toast.success(
          `Bienvenue ${prenom} ! Votre compte a été créé avec succès.`,
          { id: toastId }
        )

        navigate('/connexion')
      } else {
        toast.error(
          result.message || "Erreur lors de l'inscription",
          { id: toastId }
        )
      }
    } catch (error) {
      console.error(error)

      toast.error(
        'Erreur serveur. Veuillez réessayer.',
        { id: toastId }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30 flex items-center justify-center px-4 py-12">

      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-8 sm:p-10">

          <div className="text-center mb-8">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Créer un compte
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Rejoignez Mini Stack Overflow gratuitement
            </p>

          </div>

          <form onSubmit={Register} className="space-y-5">

            <div className="flex gap-3">

              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Prénom
                </label>

                <input
                  type="text"
                  required
                  placeholder="Prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Nom
                </label>

                <input
                  type="text"
                  required
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Adresse email
              </label>

              <input
                type="email"
                required
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mot de passe
              </label>

              <div className="relative">

                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() => setShowpassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Déjà un compte ?{' '}
            <Link
              to="/connexion"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Inscription