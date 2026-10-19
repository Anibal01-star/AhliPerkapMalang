import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Megaphone } from 'lucide-react';

export default function Navbar({ cartCount }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/katalog', label: 'Katalog' },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Navigasi utama">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <span className="brand-icon" aria-hidden="true">
            <Megaphone size={20} />
          </span>
          Ahli Perkap
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <a href="#tentang">Tentang</a>
          <a href="#kontak">Kontak</a>
        </div>

        <div className="navbar-cta">
          <Link
            to="/pesanan"
            className="navbar-cart-btn"
            aria-label={`Pesanan (${cartCount} barang)`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          <Link to="/katalog" className="btn btn-primary btn-sm">
            Pesan Sekarang
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMobile}
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
        <a href="#tentang" onClick={closeMobile}>
          Tentang
        </a>
        <a href="#kontak" onClick={closeMobile}>
          Kontak
        </a>
        <Link
          to="/pesanan"
          onClick={closeMobile}
        >
          Pesanan {cartCount > 0 && `(${cartCount})`}
        </Link>
        <Link to="/katalog" className="btn btn-primary" onClick={closeMobile}>
          Pesan Sekarang
        </Link>
      </div>
    </nav>
  );
}
