import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000";

function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
}

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ titre: "", description: "" });
  const [actionError, setActionError] = useState("");

  const token = localStorage.getItem("token");
  const userId = token ? getUserIdFromToken(token) : null;
  const estAuteur = question && userId && question.auteur?._id === userId;

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/api/questions/${id}`);
      if (!response.ok) throw new Error("Question introuvable");
      const data = await response.json();
      setQuestion(data);
      setFormData({ titre: data.titre, description: data.description });
    } catch (error) {
      console.error(error);
      setErreur(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette question définitivement ?")) return;

    try {
      const response = await fetch(`${API_URL}/api/questions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Échec de la suppression");

      navigate("/");
    } catch (error) {
      setActionError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Échec de la modification");

      const data = await response.json();
      setQuestion(data.question);
      setIsEditing(false);
    } catch (error) {
      setActionError(error.message);
    }
  };

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-slate-500 text-center">Chargement...</p>
      </section>
    );
  }

  if (erreur || !question) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Question introuvable
          </h1>
          <p className="text-slate-500 mb-6">
            Cette question n'existe pas ou a été supprimée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux questions
      </Link>

      <article className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100">

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {question.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}

            {question.resolu && (
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                Résolue
              </span>
            )}
          </div>

          {!isEditing ? (
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
              {question.titre}
            </h1>
          ) : (
            <input
              className="w-full border rounded-lg p-2 mb-4 text-xl font-bold"
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            />
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>Posée par {question.auteur?.nom || "Anonyme"}</span>
            <span>{new Date(question.createdAt).toLocaleString()}</span>
            <span>{question.votes ?? 0} votes</span>
          </div>

          {estAuteur && !isEditing && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Supprimer
              </button>
            </div>
          )}

          {actionError && (
            <p className="text-red-500 text-sm mt-3">{actionError}</p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {!isEditing ? (
            <p className="text-slate-600 leading-relaxed mb-5">
              {question.description}
            </p>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <textarea
                className="w-full border rounded-lg p-3"
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ titre: question.titre, description: question.description });
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}

          {!isEditing && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/connexion"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Répondre à cette question
              </Link>
              <Link
                to="/ajouter_question"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                Poser une question
              </Link>
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default Detail;