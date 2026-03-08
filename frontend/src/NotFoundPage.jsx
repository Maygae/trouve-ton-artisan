// src/NotFoundPage.jsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center">
      <img
        src="https://via.placeholder.com/400x200?text=404"
        alt="404"
        className="mb-3"
      />

      <h1>Page non trouvée</h1>

      <div className="alert alert-danger mt-3" role="alert">
        La page que vous avez demandée n’existe pas.
      </div>

      <Link to="/" className="btn btn-primary mt-2">
        Retour à l’accueil
      </Link>
    </div>
  );
}
