// src/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row">
          {/* Menu des pages légales */}
          <div className="col-md-4 mb-3">
            <h2 className="h6">Pages légales</h2>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light" to="/mentions-legales">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/donnees-personnelles">
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/accessibilite">
                  Accessibilité
                </Link>
              </li>
              <li>
                <Link className="text-light" to="/cookies">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Coordonnées de l’antenne de Lyon */}
          <div className="col-md-4 mb-3">
            <h2 className="h6">Antenne de Lyon</h2>
            <address className="mb-0">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a className="text-light" href="tel:+33426734000">
                +33 (0)4 26 73 40 00
              </a>
            </address>
          </div>

          {/* Copyright */}
          <div className="col-md-4 mb-3 d-flex align-items-end justify-content-md-end">
            <p className="mb-0">
              © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
