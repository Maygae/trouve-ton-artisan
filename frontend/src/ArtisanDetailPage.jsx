// src/ArtisanDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "./assets/Logo.png";

const API_URL = "http://localhost:4000/api";

export default function ArtisanDetailPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/artisans/${id}`)
      .then((res) => res.json())
      .then((data) => setArtisan(data))
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artisan) return;

    fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_artisan: artisan.id_artisan,
        nom: form.nom,
        email: form.email,
        objet: form.objet,
        message: form.message,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur envoi");
        setSent(true);
      })
      .catch(console.error);
  };

  const renderStars = (note) => {
    const rating = Math.round(parseFloat(note) || 0);
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  if (!artisan) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{artisan.nom}</h1>

      {/* Image (ici le logo du site) */}
      <img
        src={logo}
        alt={artisan.nom}
        className="img-fluid mb-3"
        style={{ maxWidth: "200px" }}
      />

      <p>{renderStars(artisan.note)}</p>
      <p>{artisan.Specialty?.libelle_specialite}</p>
      <p>{artisan.ville}</p>

      <section className="mb-4">
        <h2>A propos</h2>
        <p>{artisan.a_propos}</p>
      </section>

      <section>
        <h2>Contacter l’artisan</h2>
        {sent && (
          <div className="alert alert-success">Message envoyé.</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom</label>
            <input
              name="nom"
              className="form-control"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Objet</label>
            <input
              name="objet"
              className="form-control"
              value={form.objet}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Envoyer
          </button>
        </form>
      </section>

      {artisan.site_web && (
        <p className="mt-3">
          Site web :{" "}
          <a href={artisan.site_web} target="_blank" rel="noreferrer">
            {artisan.site_web}
          </a>
        </p>
      )}
    </div>
  );
}
