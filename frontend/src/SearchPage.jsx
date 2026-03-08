// src/SearchPage.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API_URL = "http://localhost:4000/api";

function useQueryParam() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useQueryParam();
  const q = searchParams.get("q") || "";

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/artisans?search=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [q]);

  const renderContent = () => {
    const term = q.trim();

    if (!term) {
      return <p>Veuillez saisir un nom d’artisan dans la barre de recherche.</p>;
    }

    if (loading) {
      return <p>Chargement des résultats…</p>;
    }

    if (results.length === 0) {
      return <p>Aucun artisan trouvé pour « {term} ».</p>;
    }

    return (
      <>
        <h1>Résultats pour « {term} »</h1>
        <div className="row">
          {results.map((a) => (
            <div className="col-md-4 mb-3" key={a.id_artisan}>
              <div className="card h-100">
                <div className="card-body">
                  <h2 className="h5">{a.nom}</h2>
                  <p>{a.Specialty?.libelle_specialite}</p>
                  <p>{a.ville}</p>
                  <Link
                    to={`/artisan/${a.id_artisan}`}
                    className="btn btn-outline-primary"
                  >
                    Voir la fiche
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return <section>{renderContent()}</section>;
}
