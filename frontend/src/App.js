// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import ArtisansListPage from "./ArtisansListPage";
import ArtisanDetailPage from "./ArtisanDetailPage";
import LegalPage from "./LegalPage";
import NotFoundPage from "./NotFoundPage";
import SearchPage from "./SearchPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="container my-4">
        <Routes>
          {/* Page d’accueil */}
          <Route path="/" element={<HomePage />} />

          {/* Recherche d’artisans par nom */}
          <Route path="/recherche" element={<SearchPage />} />

          {/* Liste des artisans pour une catégorie donnée */}
          <Route path="/categorie/:id" element={<ArtisansListPage />} />

          {/* Fiche détaillée d’un artisan */}
          <Route path="/artisan/:id" element={<ArtisanDetailPage />} />

          {/* Pages légales */}
          <Route
            path="/mentions-legales"
            element={<LegalPage title="Mentions légales" />}
          />
          <Route
            path="/donnees-personnelles"
            element={<LegalPage title="Données personnelles" />}
          />
          <Route
            path="/accessibilite"
            element={<LegalPage title="Accessibilité" />}
          />
          <Route path="/cookies" element={<LegalPage title="Cookies" />} />

          {/* Page 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
