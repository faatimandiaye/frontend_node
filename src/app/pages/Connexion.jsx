import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchApi, readApiResponse } from '../../config/api'
const API_URL= import.meta.env.VITE_API_URL

const Connexion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs.')
      return
    }

    setLoading(true)

    try {
      console.log('Données envoyées :', { email, password })

      const response = await fetch(`${API_URL}/api/auth/connexion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('Status :', response.status)

      const result = await readApiResponse(response)

      console.log('Réponse API :', result)

      if (response.ok) {
        if (result.token) {
          localStorage.setItem('token', result.token)
        }

        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user))
        }

        const name = [result.user?.prenom, result.user?.nom]
          .filter(Boolean)
          .join(' ')

        alert(`✅ Connexion réussie !\n\nBienvenue ${name}`)

        navigate('/')
      } else {
        alert(result.message || result.error || '❌ Identifiants incorrects.')
      }
    } catch (error) {
      console.error('Erreur complète :', error)

      if (error.name === 'AbortError') {
        alert('⏳ Le serveur met trop de temps à répondre.')
      } else {
        alert(
          '❌ Impossible de contacter le serveur.\n\nVérifiez que le backend est démarré puis cliquez sur OK.'
        )
      }
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
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-slate-800">
              Bon retour !
            </h1>

            <p className="text-slate-500 text-sm mt-1">
              Connectez-vous à votre compte DevForum
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Adresse email
              </label>

              <input
                type="email"
                placeholder="exemple@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Mot de passe
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Pas encore de compte ?{' '}
            <Link
              to="/inscription"
              className="text-indigo-600 font-semibold hover:underline"
            >
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Connexion