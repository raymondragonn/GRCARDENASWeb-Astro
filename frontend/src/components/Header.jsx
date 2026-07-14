import { useState } from 'react';
import logo from '../assets/marca/logo-gr-cardenas.png';

const NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Renta y Especializados', to: '/renta' },
  { label: 'Experiencia', to: '/experiencia' },
  { label: 'Prácticas', to: '/practicas' },
];

const MOBILE_NAV_ITEMS = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Renta y Especializados', to: '/renta' },
  { label: 'Experiencia', to: '/experiencia' },
  { label: 'Prácticas', to: '/practicas' },
];

const normalizePath = (path) => (path.length > 1 ? path.replace(/\/$/, '') : path);

export default function Header({ currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activePath = normalizePath(currentPath);

  const close = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <div className="site-header-inner">
        <a href="/" aria-label="GR Cárdenas Construcciones — Inicio" className="brand">
          <img className="brand-logo" src={logo.src} width="44" height="44" alt="" />
          <span className="brand-name">
            <strong>GR CARDENAS</strong>
            <span>Construcciones</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className={`nav-link${activePath === item.to ? ' is-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a href="/contacto" className="nav-cta">
            Contáctanos
          </a>
        </nav>

        <button
          className="burger"
          type="button"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <span className="mobile-menu-brand">GR Cardenas Construcciones</span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={close}
              className="mobile-menu-close"
            >
              ✕
            </button>
          </div>
          {MOBILE_NAV_ITEMS.map((item) => (
            <a key={item.to} href={item.to} onClick={close} className="mobile-menu-link">
              {item.label}
            </a>
          ))}
          <a href="/contacto" onClick={close} className="mobile-menu-cta">
            Contáctanos
          </a>
        </div>
      )}
    </header>
  );
}
