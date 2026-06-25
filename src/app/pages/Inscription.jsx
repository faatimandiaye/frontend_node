import React, { useState ,  } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Inscription = () => {

  
  const [ email , setEmail ] = useState('');
  const [ password , setPassword ] = useState('');
  const [ prenom , setPrenom ] = useState('');
  const [ nom , setNom ] = useState('');
  const [ showPassword, setShowpassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const Register = async (e) => {
      e.preventDefault();

        if (!prenom || !nom || !email || !password ) {
            alert("Veuillez remplir tous les champs");
            return;
        }
        setLoading(true)
        const toastId = toast.loading('Creation de compte...')
  
        try {
            const response = await fetch("https://backend-node-udx0.onrender.com/api/auth/inscription", {
            //const response = await fetch("http://localhost:3000/api/auth/inscription", {
                method: "POST",
                headers: {'Content-Type': 'application/json'  },
                body: JSON.stringify({ prenom, nom, email, password }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Inscription réussie ✔️ Bienvenue !', { id: toastId })
                  navigate('/connexion')
                
            } else {
                alert(result.message || "Erreur lors de l'inscription", {id: toastId })
            }

        } catch (error) {
            console.error(error)
            toast.error('Erreur serveur. Veuillez réessayer.', { id: toastId })
        } finally {
            setLoading(false)
        }
     }

     const inputClass = 
     ''


  return (
      <div className="w-screen h-screen  flex items-center justify-center">

        <div className="w-full max-w-xl p-5 bg-white">

            <h1 className="text-center font-bold text-xl">Inscription</h1>

            <form onSubmit={Register}>
                <div className="flex flex-col gap-2">
                    <label >Prénom</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="text" placeholder="Prénom"
                         value = {prenom}
                        onChange={ (e) => setPrenom(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label >Nom</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="text"  placeholder="Nom"
                         value = {nom}
                        onChange={ (e) => setNom(e.target.value)}/>
                      
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label >Email</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="email"  placeholder="exemple@gmail.com"
                         value = {email}
                        onChange={ (e) => setEmail(e.target.value)}/>
                        
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label >Mot de passe</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="password"  placeholder="Mot de passe"
                         value = {password}
                        onChange={ (e) => setPassword(e.target.value)}/>
                         
                </div>

                <button type="submit" id="btn2" className="w-full bg-black text-white mt-10 py-2 mb-2">S'inscrire</button>
                <Link to="/" className="text-red-600 font-bold underline">Se connecter</Link>
            </form>

        </div>

    </div>
  )
}

export default Inscription
