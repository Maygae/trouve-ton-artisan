import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "http://localhost:4000/api";

export default function ArtisansListPage() {
  const { id } = useParams(); // id de la catégorie
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/artisans`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (a) =>
            a.Specialty &&
            a.Specialty.Category &&
            String(a.Specialty.Category.id_categorie) === String(id)
        );
        setArtisans(filtered);
      })
      .catch(console.error);
  }, [id]);

  const renderStars = (note) => {
    const rating = Math.round(parseFloat(note) || 0);
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div>
      <h1>Artisans</h1>
      <div className="row">
        {artisans.map((a) => (
          <div className="col-md-4 mb-3" key={a.id_artisan}>
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5">{a.nom}</h2>
                <p>{a.Specialty?.libelle_specialite}</p>
                <p>{a.ville}</p>
                <p>{renderStars(a.note)}</p>
                <Link
                  to={`/artisan/${a.id_artisan}`}
                  className="btn btn-primary"
                >
                  Voir la fiche
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
