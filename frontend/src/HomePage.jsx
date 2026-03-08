import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const API_URL = "http://localhost:4000/api";

export default function HomePage() {
  const [topArtisans, setTopArtisans] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/artisans`)
      .then((res) => res.json())
      .then((data) => {
        const tops = data.filter((a) => a.est_top).slice(0, 3);
        setTopArtisans(tops);
      })
      .catch(console.error);
  }, []);

  const renderStars = (note) => {
    const rating = Math.round(parseFloat(note) || 0);
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <>
      <section className="mb-5">
        <h1>Comment trouver mon artisan ?</h1>
        <ol>
          <li>Choisir la catégorie d’artisanat dans le menu.</li>
          <li>Choisir un artisan.</li>
          <li>Le contacter via le formulaire de contact.</li>
          <li>Une réponse sera apportée sous 48h.</li>
        </ol>
      </section>

      <section>
        <h2>Les artisans du mois</h2>
        <div className="row">
          {topArtisans.map((a) => (
            <div className="col-md-4 mb-3" key={a.id_artisan}>
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h5">{a.nom}</h3>
                  <p>{a.Specialty?.libelle_specialite}</p>
                  <p>{a.ville}</p>
                  <p>{renderStars(a.note)}</p>
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
      </section>
    </>
  );
}
