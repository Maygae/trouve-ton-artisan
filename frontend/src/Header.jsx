// src/Header.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/Logo.png";

const API_URL = "http://localhost:4000/api";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/recherche?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="bg-light border-bottom">
      <nav className="navbar navbar-expand-lg container">
        {/* Logo seul, plus grand, lien vers l'accueil */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Trouve ton artisan - Auvergne-Rhône-Alpes"
            className="logo-img"
          />
        </Link>

        {/* Bouton burger pour mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Basculer la navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu + recherche */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto">
            {categories.map((cat) => (
              <li className="nav-item" key={cat.id_categorie}>
                <Link
                  className="nav-link"
                  to={`/categorie/${cat.id_categorie}`}
                >
                  {cat.libelle_categorie}
                </Link>
              </li>
            ))}
          </ul>

          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2 header-search-input"
              type="search"
              placeholder="Rechercher un artisan"
              aria-label="Rechercher un artisan par son nom"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              OK
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
