import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ;
const TOKEN_KEY = "token";

const QuestionForm = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre.trim() || !description.trim()) {
      setStatus("error");
      setErrorMessage("Le titre et la description sont obligatoires.");
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setStatus("error");
      setErrorMessage("Tu dois être connecté pour poser une question.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre, description }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "Erreur serveur");
      }

      setTitre("");
      setDescription("");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6">
          <span>Poser une question</span>
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full border rounded p-3 mb-4"
            placeholder="Titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />

          <textarea
            className="w-full border rounded p-3 mb-4"
            rows={6}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {status === "error" && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 flex gap-2">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 flex gap-2">
              <CheckCircle2 size={18} />
              <span>Question publiée avec succès.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-indigo-600 text-white px-6 py-3 rounded w-full"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="animate-spin inline mr-2" size={18} />
                <span>Publication...</span>
              </>
            ) : (
              <span>Publier la question</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};

export default QuestionForm;